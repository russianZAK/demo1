public class JiraIssueCreator {
    private final IssueRestClient issueClient;
    private static final int MAX_RETRIES = 4;
    private static final long INITIAL_RETRY_DELAY_MS = 5000; // Начальная задержка 5 секунд
    private static final long MAX_RETRY_DELAY_MS = 30000; // Максимальная задержка 30 секунд

    public JiraIssueCreator(IssueRestClient issueClient) {
        this.issueClient = issueClient;
    }

    public void createSubtasksWithRetry(List<IssueInput> subtasks) {
        List<CompletableFuture<Void>> futures = subtasks.stream()
            .map(subtask -> CompletableFuture.runAsync(() -> createSubtaskWithRetries(subtask)))
            .toList();

        // Ожидание завершения всех задач
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
    }

    private void createSubtaskWithRetries(IssueInput subtask) {
        int retryCount = 0;
        long lastRetryDelayMillis = INITIAL_RETRY_DELAY_MS;

        while (retryCount < MAX_RETRIES) {
            try {
                // Попытка создать подзадачу
                issueClient.createIssue(subtask).claim();
                return; // Успех, выходим из метода
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode().value() == 429) {
                    // Обработка превышения лимита запросов
                    lastRetryDelayMillis = handleRateLimit(e);
                } else {
                    // Обработка других ошибок
                    handleFailure(e);
                    return;
                }
            } catch (Exception e) {
                // Обработка других ошибок
                handleFailure(e);
                return;
            }

            retryCount++;
            try {
                // Увеличиваем задержку с добавлением джиттера
                long jitter = (long) (lastRetryDelayMillis * (0.7 + Math.random() * 0.6));
                TimeUnit.MILLISECONDS.sleep(jitter);
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt(); // Восстановление прерывания
                break; // Выходим из цикла
            }
        }

        handleFailure(new Exception("Exceeded maximum retries for creating subtask: " + subtask.getSummary()));
    }

    private long handleRateLimit(HttpClientErrorException e) {
        long retryDelayMillis = INITIAL_RETRY_DELAY_MS;

        // Извлечение заголовка Retry-After, если он есть
        if (e.getResponseHeaders().containsKey("Retry-After")) {
            String retryAfterValue = e.getResponseHeaders().get("Retry-After").get(0);
            retryDelayMillis = Long.parseLong(retryAfterValue) * 1000; // Конвертация в миллисекунды
        } else {
            // Увеличиваем задержку, если заголовок отсутствует
            retryDelayMillis = Math.min(2 * retryDelayMillis, MAX_RETRY_DELAY_MS);
        }

        return retryDelayMillis;
    }

    private void handleFailure(Exception e) {
        // Логируем ошибку или выполняем другие действия по обработке неудачи
        System.err.println("Failed to create subtask: " + e.getMessage());
    }
}

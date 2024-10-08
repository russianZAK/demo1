
```
import com.atlassian.jira.rest.client.domain.IssueInput;
import com.atlassian.jira.rest.client.domain.IssueRestClient;
import com.atlassian.jira.rest.client.RestClientException;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class JiraIssueCreator {
    private final IssueRestClient issueClient;
    private static final int MAX_RETRIES = 4;
    private static final long INITIAL_RETRY_DELAY_MS = 5000; // Начальная задержка 5 секунд
    private static final long MAX_RETRY_DELAY_MS = 30000; // Максимальная задержка 30 секунд
    private static final int THREAD_POOL_SIZE = 5; // Количество потоков

    public JiraIssueCreator(IssueRestClient issueClient) {
        this.issueClient = issueClient;
    }

    public void createSubtasksSequentially(List<IssueInput> subtasks) {
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

        for (IssueInput subtask : subtasks) {
            executor.submit(() -> createSubtaskWithRetries(subtask));
        }

        // Завершение работы ExecutorService
        executor.shutdown();
        try {
            // Ожидание завершения всех задач
            if (!executor.awaitTermination(1, TimeUnit.HOURS)) {
                executor.shutdownNow(); // Принудительное завершение, если не все задачи завершились
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
            Thread.currentThread().interrupt(); // Восстановление прерывания
        }
    }

    private void createSubtaskWithRetries(IssueInput subtask) {
        int retryCount = 0;
        long lastRetryDelayMillis = INITIAL_RETRY_DELAY_MS;

        while (retryCount < MAX_RETRIES) {
            try {
                // Попытка создать подзадачу
                issueClient.createIssue(subtask).claim();
                return; // Успех, выходим из метода
            } catch (RestClientException e) {
                // Обработка RestClientException
                if (isRateLimitException(e)) {
                    lastRetryDelayMillis = handleRateLimit(e);
                } else {
                    // Логируем и обрабатываем другие ошибки
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

    private boolean isRateLimitException(RestClientException e) {
        // Проверка, является ли исключение связано с превышением лимита запросов
        // Вы можете дополнительно анализировать сообщение исключения или его код
        return e.getMessage() != null && e.getMessage().contains("429");
    }

    private long handleRateLimit(RestClientException e) {
        long retryDelayMillis = INITIAL_RETRY_DELAY_MS;

        // Логика обработки лимитов, если информация доступна
        // Если нет доступа к заголовкам, используем базовый подход
        retryDelayMillis = Math.min(2 * retryDelayMillis, MAX_RETRY_DELAY_MS);

        return retryDelayMillis;
    }

    private void handleFailure(Exception e) {
        // Логируем ошибку или выполняем другие действия по обработке неудачи
        System.err.println("Failed to create subtask: " + e.getMessage());
    }
}
```

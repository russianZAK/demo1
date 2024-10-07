import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

public class ConfluenceService {
    
    private static final String CONFLUENCE_BASE_URL = "https://your-confluence-instance.atlassian.net/wiki";
    private static final String USERNAME = "your-username";
    private static final String API_TOKEN = "your-api-token";
    
    private RestTemplate restTemplate = new RestTemplate();

    public String getPageContent(String pageId) {
        String url = CONFLUENCE_BASE_URL + "/rest/api/content/" + pageId + "?expand=body.storage";
        
        HttpHeaders headers = createHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();
    }

    public String createChildPage(String parentPageId, String updatedContent, String newPageTitle) {
        String url = CONFLUENCE_BASE_URL + "/rest/api/content";

        HttpHeaders headers = createHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = "{"
                + "\"type\": \"page\","
                + "\"title\": \"" + newPageTitle + "\","
                + "\"space\": { \"key\": \"SPACE_KEY\" },"
                + "\"ancestors\": [{ \"id\": \"" + parentPageId + "\" }],"
                + "\"body\": {"
                + "\"storage\": {"
                + "\"value\": \"" + updatedContent + "\","
                + "\"representation\": \"storage\""
                + "}"
                + "}"
                + "}";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        return restTemplate.exchange(url, HttpMethod.POST, entity, String.class).getBody();
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String auth = USERNAME + ":" + API_TOKEN;
        String base64Creds = Base64.getEncoder().encodeToString(auth.getBytes());
        headers.add("Authorization", "Basic " + base64Creds);
        return headers;
    }
}

package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class TaskDto {
    public TaskDto() {
    }

    public TaskDto(
        String title, String description, String epic, String changeRequest, String releaseTask,
        List<String> components,
        String tester, String analyst, String developer, Boolean newFunctionality, Boolean nt
    ) {
        this.title = title;
        this.description = description;
        this.epic = epic;
        this.changeRequest = changeRequest;
        this.releaseTask = releaseTask;
        this.components = components;
        this.tester = tester;
        this.analyst = analyst;
        this.developer = developer;
        this.newFunctionality = newFunctionality;
        this.nt = nt;
    }

    private String title;
    private String description;
    private String epic;
    private String changeRequest;
    private String releaseTask;
    private List<String> components; // IDs компонентов
    private String tester; // ID тестировщика
    private String analyst; // ID системного аналитика
    private String developer; // ID разработчика

    private Boolean newFunctionality;

    private Boolean nt;

    public Boolean getNewFunctionality() {
        return newFunctionality;
    }

    public void setNewFunctionality(Boolean newFunctionality) {
        this.newFunctionality = newFunctionality;
    }

    public Boolean getNt() {
        return nt;
    }

    public void setNt(Boolean nt) {
        this.nt = nt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEpic() {
        return epic;
    }

    public void setEpic(String epic) {
        this.epic = epic;
    }

    public String getChangeRequest() {
        return changeRequest;
    }

    public void setChangeRequest(String changeRequest) {
        this.changeRequest = changeRequest;
    }

    public String getReleaseTask() {
        return releaseTask;
    }

    public void setReleaseTask(String releaseTask) {
        this.releaseTask = releaseTask;
    }

    public List<String> getComponents() {
        return components;
    }

    public void setComponents(List<String> components) {
        this.components = components;
    }

    public String getTester() {
        return tester;
    }

    public void setTester(String tester) {
        this.tester = tester;
    }

    public String getAnalyst() {
        return analyst;
    }

    public void setAnalyst(String analyst) {
        this.analyst = analyst;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    @Override
    public String toString() {
        return "TaskDto{" +
            "title='" + title + '\'' +
            ", description='" + description + '\'' +
            ", epic='" + epic + '\'' +
            ", changeRequest='" + changeRequest + '\'' +
            ", releaseTask='" + releaseTask + '\'' +
            ", components=" + components +
            ", tester='" + tester + '\'' +
            ", analyst='" + analyst + '\'' +
            ", developer='" + developer + '\'' +
            ", newFunctionality=" + newFunctionality +
            ", nt=" + nt +
            '}';
    }
}

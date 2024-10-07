package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TaskController {

    @GetMapping("/create-task")
    public String showTaskForm(Model model) {
        model.addAttribute("taskDto", new TaskDto());
        model.addAttribute("components", List.of("Frontend", "Backend", "Database", "API", "Mobile", "Desktop"));
        model.addAttribute("testers", List.of("Manual", "Automated"));
        model.addAttribute("analysts", List.of("Business", "System"));
        model.addAttribute("developers", List.of("Junior", "Middle", "Senior"));
        return "task-form";
    }

    @PostMapping("/create-task")
    public String createTask(@ModelAttribute TaskDto taskDto, Model model) {
        // Логика создания задачи
        model.addAttribute("success", true);
        model.addAttribute("taskId", "1");
        System.out.println(taskDto);
        return "task-form";
    }

    @GetMapping("/validate-epic/{epicId}")
    @ResponseBody
    public EpicResponse validateEpic(@PathVariable String epicId) {
        return new EpicResponse(true, "Epic Name ksdskd");
    }

    @GetMapping("/validate-change-request/{requestId}")
    @ResponseBody
    public ChangeRequestResponse validateChangeRequest(@PathVariable String requestId) {
        return new ChangeRequestResponse(true, "Change Request Name");
    }

    @GetMapping("/validate-release/{releaseId}")
    @ResponseBody
    public ReleaseResponse validateRelease(@PathVariable String releaseId) {
        return new ReleaseResponse(false, "Release Name");
    }
}

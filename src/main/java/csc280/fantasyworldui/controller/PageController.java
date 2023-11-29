package csc280.fantasyworldui.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

        @GetMapping("/")
        public String index() {
                return "index";
        }

        @GetMapping("/class")
        public String getClassPage() {
                return "class";
        }
        @GetMapping("/race")
        public String getRacePage() {
                return "race";
        }
        @GetMapping("/spell")
        public String getSpellPage() {
                return "spell";
        }
        @GetMapping("/user")
        public String getUserPage() {
                return "users";
        }
}

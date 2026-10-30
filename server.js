
const express = require("express");
const path = require("path");

const courses = require("./data/courses");

const app = express();

const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home page route
app.get("/", (req, res) => {
    res.render("pages/index", {
        title: "Home",
        courses: courses.slice(0, 3)
    });
});

// Courses page with search functionality
app.get("/courses", (req, res) => {

    const search = req.query.search || "";

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
    );

    res.render("pages/courses", {
        title: "Courses",
        courses: filteredCourses,
        search: search
    });

});

// Individual course details route
app.get("/courses/:id", (req, res) => {

    const courseId = parseInt(req.params.id);

    const course = courses.find(c => c.id === courseId);

    if (!course) {
    return res.status(404).render("pages/404", {
        title: "Course Not Found"
    });
}

    res.render("pages/course-detail", {
        title: course.title,
        course: course
    });

});

// About page route
app.get("/about", (req, res) => {

    res.render("pages/about", {
        title: "About Us"
    });

});

// 404 page route
app.use((req, res) => {
    res.status(404).render("pages/404", {
        title: "Page Not Found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// profile.js

document.addEventListener("DOMContentLoaded", function () {
    const profileContainer = document.getElementById('profile-container');
    const coursesContainer = document.getElementById('courses-container');
    const skillsContainer = document.getElementById('skills-container');
    
    // Fetch user data from the server when the profile page is loaded
    fetchUserData();

    // Function to fetch user data, courses, and skills
    async function fetchUserData() {
        try {
            // Make an API call to retrieve user data
            const response = await fetch('/get_user_data');
            const data = await response.json();

            if (response.ok) {
                displayProfileData(data.userData);
                displayCourses(data.courses);
                displaySkills(data.skills);
            } else {
                showError(data.message || "Error fetching user data");
            }
        } catch (error) {
            showError("Error fetching data: " + error.message);
        }
    }

    // Function to display user profile data
    function displayProfileData(userData) {
        if (userData) {
            const nameElement = document.getElementById('user-name');
            const emailElement = document.getElementById('user-email');
            const collegeElement = document.getElementById('user-college');
            const branchElement = document.getElementById('user-branch');
            const yearElement = document.getElementById('user-year');
            const mobileElement = document.getElementById('user-mobile');
            
            nameElement.textContent = userData.name || "N/A";
            emailElement.textContent = userData.email || "N/A";
            collegeElement.textContent = userData.college || "N/A";
            branchElement.textContent = userData.branch || "N/A";
            yearElement.textContent = userData.year || "N/A";
            mobileElement.textContent = userData.mobile || "N/A";
        } else {
            showError("No user data found");
        }
    }

    // Function to display enrolled courses
    function displayCourses(courses) {
        if (courses && courses.length > 0) {
            courses.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.classList.add('course-item');
                courseElement.textContent = course.name || "Course Name Not Available";
                coursesContainer.appendChild(courseElement);
            });
        } else {
            const noCoursesMessage = document.createElement('p');
            noCoursesMessage.textContent = "You are not enrolled in any courses yet.";
            coursesContainer.appendChild(noCoursesMessage);
        }
    }

    // Function to display user skills
    function displaySkills(skills) {
        if (skills && skills.length > 0) {
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.classList.add('skill-item');
                skillElement.textContent = skill.name || "Skill Not Available";
                skillsContainer.appendChild(skillElement);
            });
        } else {
            const noSkillsMessage = document.createElement('p');
            noSkillsMessage.textContent = "You have not added any skills yet.";
            skillsContainer.appendChild(noSkillsMessage);
        }
    }

    // Function to show error messages on the page
    function showError(message) {
        const errorContainer = document.getElementById('error-container');
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
    }
});

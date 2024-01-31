function update_work(selected_work, work_data) {
    console.log(selected_work);
    console.log(work_data[selected_work]);
    document.getElementById("work-title").innerHTML = work_data[selected_work].Title;
    document.getElementById("work-date").innerHTML = work_data[selected_work].Date;
    console.log(document.getElementById("work-flag"));
    document.getElementById("work-flag").src = work_data[selected_work].Image;
    document.getElementById("work-desc").innerHTML = work_data[selected_work].Description;
}

function update_proj(selected, source) {
    console.log("Current project:")
    console.log(source)
    console.log(source[selected]);

    document.getElementById("proj-title").innerHTML = source[selected].title;
    document.getElementById("proj-date").innerHTML = source[selected].date;
    document.getElementById("proj-flag").src = source[selected].image;
    document.getElementById("proj-desc").innerHTML = source[selected].description;
    console.log(source[selected].link);
    console.log(document.getElementById("proj-link"));
    if (source[selected].link) {
        document.getElementById("proj-link").href = source[selected].link;
        document.getElementById("proj-link").style.display = "block";
    } else {
        document.getElementById("proj-link").style.display = "none";
    }


}



function initialise_work(work_data) {

}

function initialise_proj(proj_data) {

}

window.onload = function () {
    let work_locked = false;
    let proj_locked = false;
    async function fetchWorkData() {
        const response = await fetch("work.json");
        work_data = await response.json();
        console.log(work_data);
        return work_data;
    }

    async function fetchProjectData() {
        const response = await fetch("projects.json");
        project_data = await response.json();
        console.log("Fetched project data:")
        console.log(project_data);
        return project_data;
    }
    let selected_work = "DD";
    let selected_proj = 0;

    let project_data = fetchProjectData().then(
        () => {
            console.log(project_data);
            update_proj(selected_proj, project_data);
        });

    let work_data = fetchWorkData().then(
        () => {
            console.log(work_data);
            update_work(selected_work, work_data);
        });

    //Work
    var elements = document.getElementsByClassName("work-li");
    elements = Array.from(elements);
    elements.forEach(element => {
        element.addEventListener('mouseover', function () {
            if (work_locked) {
                return;
            }
            try {
                selected_work = element.getAttribute("data-id");
                update_work(selected_work, work_data);
            } catch (error) {
                // Supress error
            }
        });
        element.addEventListener('click', function () {
            elements.forEach(element => {
                // Remove the locked class
                element.classList.remove("locked");
            });
            // Add the locked class
            element.classList.add("locked");
            work_locked = true;
            try {
                selected_work = element.getAttribute("data-id");
                update_work(selected_work, work_data);
            } catch (error) {
                // Supress error
            }
        });
    });
    // Projects
    var elements = document.getElementsByClassName("proj-li");
    elements = Array.from(elements);
    elements.forEach(element => {
        element.addEventListener('mouseover', function () {
            if (proj_locked) {
                return;
            }
            try {
                selected_proj = element.getAttribute("data-id");
                update_proj(selected_proj, project_data);
            } catch (error) {
                console.log(error)
            }
        });
        element.addEventListener('click', function () {
            elements.forEach(element => {
                // Remove the locked class
                element.classList.remove("locked");
            });
            // Add the locked class
            element.classList.add("locked");
            proj_locked = true;
            try {
                selected_proj = element.getAttribute("data-id");
                update_proj(selected_proj, project_data);
            } catch (error) {
                // Supress error
            }
        });
    });


}
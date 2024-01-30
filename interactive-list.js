function update_work(selected_work, work_data) {
    console.log(selected_work);
    console.log(work_data[selected_work]);
    document.getElementById("work-title").innerHTML = work_data[selected_work].Title;
    document.getElementById("work-date").innerHTML = work_data[selected_work].Date;
    console.log(document.getElementById("work-flag"));
    document.getElementById("work-flag").src = work_data[selected_work].Image;
    document.getElementById("work-desc").innerHTML = work_data[selected_work].Description;
}
window.onload = function () {
    let locked = false;
    async function fetchWorkData() {
        const response = await fetch("work.json");
        work_data = await response.json();
        console.log(work_data);
        return work_data;
    }
    let selected_work = "DD";
    let work_data = fetchWorkData().then(
        () => {
            console.log(work_data);
            update_work(selected_work, work_data);
        });

    var elements = document.getElementsByClassName("work-li");
    elements = Array.from(elements);
    elements.forEach(element => {
        element.addEventListener('mouseover', function () {
            if (locked) {
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
            locked = true;
            try {
                selected_work = element.getAttribute("data-id");
                update_work(selected_work, work_data);
            } catch (error) {
                // Supress error
            }
        });
    });

}
jQuery(document).ready(function () {
    if (window.localStorage.getItem("plp-resize") === null) {
        window.localStorage.setItem("plp-resize", JSON.stringify({ w: "1310" + "px", h: "850" + "px" }));
    }

    let plpResizable = document.querySelectorAll(".plp-resizable");

    plpResizable.forEach((e) => {
        e.addEventListener("mousedown", () => { PlpSaveSize(e) });
        e.addEventListener("mouseup", () => { PlpSaveSize(e) });
        e.addEventListener("mouseleave", () => { PlpSaveSize(e) });
        e.addEventListener("mouseout", () => { PlpSaveSize(e) });

        e.parentElement.addEventListener("mouseleave", () => { PlpSaveSize(e) });
        e.parentElement.addEventListener("mouseout", () => { PlpSaveSize(e) });
        e.parentElement.addEventListener("mousedown", () => { PlpSaveSize(e) });
        e.parentElement.addEventListener("mouseup", () => { PlpSaveSize(e) });
    });

    if (window.localStorage.getItem("plp-resize") !== null) {
        try {
            PlpResizeAll(JSON.parse(localStorage.getItem("plp-resize")));
        } catch (e) {
            console.error("PLP: Error parsing resize settings", e);
        }
    }

    function PlpResizeAll(c) {
        plpResizable.forEach((frame) => {
            frame.style.height = c.h;
            frame.style.width = c.w;
        });
    }

    function PlpSaveSize(e) {
        var size = { h: e.offsetHeight + "px", w: e.offsetWidth + "px" };
        try {
            window.localStorage.setItem("plp-resize", JSON.stringify(size));
        } catch (e) {
            // Handle storage quota exceeded or security errors
        }
        PlpResizeAll(size);
    }
});

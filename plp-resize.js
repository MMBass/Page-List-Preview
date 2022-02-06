jQuery(document).ready(function () {
    if (window.localStorage.getItem("plp-resize") === null) {
        window.localStorage.setItem("plp-resize", JSON.stringify({ w: "1310" + "px", h: "850" + "px" }));
    }

    let plpResizableIframe = document.querySelectorAll(".plp-resizable-iframe");

    plpResizableIframe.forEach((e) => {
        // e.addEventListener("mouseover", () => { PlpSaveSize(e) });
        e.addEventListener("mousedown", () => { PlpSaveSize(e) });
        e.addEventListener("mouseup", () => { PlpSaveSize(e) });

        // e.parentElement.addEventListener("mouseover", () => { PlpSaveSize(e) });
        e.parentElement.addEventListener("mousedown", () => { PlpSaveSize(e) });
        e.parentElement.addEventListener("mouseup", () => { PlpSaveSize(e) });
    });

    if (window.localStorage.getItem("plp-resize") !== null) {
        PlpResizeAll(JSON.parse(localStorage.getItem("plp-resize")));
    }

    function PlpResizeAll(c) {
        plpResizableIframe.forEach((frame) => {
            frame.style.height = c.h;
            frame.style.width = c.w;
        });
    }

    function PlpSaveSize(e) {
        window.localStorage.setItem("plp-resize", JSON.stringify({ h: e.offsetHeight + "px", w: e.offsetWidth + "px" }));
        PlpResizeAll({ h: e.offsetHeight + "px", w: e.offsetWidth + "px" });
    }
});


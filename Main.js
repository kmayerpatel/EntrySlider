window.addEventListener('load',  () => {

    let e1 = new EntrySlider(0, 255, 128);

    document.querySelector("#control").append(e1.getDiv());
});
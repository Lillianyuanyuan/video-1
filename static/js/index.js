(() => {
    let html = document.getElementsByTagName('html')[0];
    const width = window.innerWidth;
    html.style.fontSize = width / 10 + 'px';
    document.onselectstart = () => false;
})()
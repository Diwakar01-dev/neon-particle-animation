export function createCanvas(canvas){
    const ctx = canvas.getContext('2d');

    function resize () {
        const dpr = Math.max(window.devicePixelRatio || 1, 2);

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    return {
        ctx,
        resize,
        destroy() {
            window.removalEventListener('resize', resize);
        }
    };
}
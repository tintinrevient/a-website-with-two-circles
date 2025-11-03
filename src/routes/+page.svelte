<script>
    import Circle from '$lib/components/Circle.svelte';
    import Tree from '$lib/components/Tree.svelte';

    let width = $state(0);
    let height = $state(0);

    let isMouseOver = $state(false);

    const handleMouseOver = () => {
        isMouseOver = true;
    }

    const handleMouseLeave = () => {
        isMouseOver = false;
    }
</script>

<div class="relative max-w-8xl mx-auto h-screen" bind:clientWidth={width} bind:clientHeight={height}>
    <div class="absolute w-full h-full">
        <Circle width={width} height={height} isMouseOver={isMouseOver} />
    </div>
    
    <div class="absolute w-full h-full">
        <Tree width={width} height={height} isMouseOver={isMouseOver} />
    </div>

    <div class="absolute w-full h-full flex flex-col justify-evenly perspective-near">
        <div class="item">I'm Shu</div>
        <div class="item" role="button" tabindex="0" onmouseover={handleMouseOver} onmouseleave={handleMouseLeave} onfocus={handleMouseOver} onblur={handleMouseLeave}>an AI engineer</div>
        <div class="item">I make things</div>
        <div class="item">with magic</div>
    </div>

</div>

<style>
    .item {
        font-family: "Gill Sans";
        font-size: 12vw;
        font-weight: bold;
        line-height: 12vw;
        text-align: left;
        transform-origin: left;
        transform: rotateY(40deg);
        transition-duration: .4s;
    }

    .item:hover {
        color: transparent;
        cursor: pointer;
        transform: rotateY(28deg) translateZ(0) scale(1.1);
        transition-duration: .4s;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
    }
</style>
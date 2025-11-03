<script>
    let { width, height, isMouseOver } = $props();
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" style="opacity: 0.5;">
    <g transform="translate({width / 2}, {height / 2})">
        <circle cx={0} cy={0} r={isMouseOver ? 150 : 180} stroke="red" stroke-width={isMouseOver ? 30 : 40} fill="black" style="transition: r 0.3s ease-in-out;"/>
    </g>
</svg>


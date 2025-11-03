<script>
    import { tree } from 'd3-hierarchy';
    import { select } from 'd3-selection';
    import { link, curveBumpX } from 'd3-shape';
    import { max } from 'd3-array';
    import { technologiesStore } from '$lib/stores/technologiesStore';
    import { getColor, getRadius } from '$lib/utils/scales';
    import { jsonToHierarchy } from '$lib/utils/hierarchy';

    let { width, height, isMouseOver } = $props();

    const technologies = $derived($technologiesStore);

    const [root, descendants, leaves] = $derived.by(() => {
        return jsonToHierarchy(technologies);
    })

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const innerWidth = $derived(width / 2 - margin.left - margin.right);
    const innerHeight = $derived(height - margin.top - margin.bottom);

    let gElement = $state();

    const linkGenerator = link(curveBumpX)
        .x(d => d.y)
        .y(d => d.x);

    $effect(() => {                        
        // Recalculate tree layout with current dimensions
        const treeLayout = tree();
        treeLayout.size([innerHeight, innerWidth - margin.left * 4]);
        treeLayout(root);

        // graph
        const innerChart = select(gElement);
        
        // links
        innerChart.selectAll('.tree-link')
            .data(root.links())
            .join('path')
                .attr('class', 'tree-link')
                .attr('d', d => linkGenerator(d))
                .attr('fill', 'none')
                .attr('stroke', 'gray')   
                .attr('stroke-opacity', d => d.target.depth === 2 ? 0.3 : 0.5);
        
        // nodes
        const maxYears = max(leaves, d => d.data.years);

        innerChart.selectAll('.tree-node')
            .data(descendants)
            .join('circle')
                .attr('class', 'tree-node')
                .attr('cx', d => d.y)
                .attr('cy', d => d.x)
                .attr('r', d => {
                    switch (d.depth) {
                        case 2: return getRadius(maxYears, d.data.years)
                        case 1: return 2
                        default: return 0
                    }
                })
                .attr('fill', d => d.depth === 2 ? getColor(technologies, d.parent.data.name) : 'white')
                .attr('fill-opacity', d => d.depth === 2 ? 0.3 : 1)
                .attr('stroke', d => d.depth === 2 ? 'none' : 'gray');
        
        // labels
        innerChart.selectAll('.tree-label')
            .data(descendants)
            .join('text')
                .attr('x', d => d.depth === 2 ? d.y - 10 : d.y + 10)
                .attr('y', d => d.x)
                .attr('text-anchor', d => d.depth === 2 ? 'start' : 'start')
                .attr('alignment-baseline', 'middle')
                .attr('paint-order', 'stroke')
                .attr('stroke', d => d === 2 ? 'none' : 'white')
                .attr('stroke-width', 2)                               
                .style('font-size', '12px')
                .text(d => d.depth === 0 ? '' : d.data.name);
    });
</script>

<svg {width} {height} viewBox='0 0 {width} {height}' style="opacity: {isMouseOver ? 1 : 0}; transition: opacity 0.5s ease-in-out;">
    <g bind:this={gElement} transform='translate({width / 2}, {0 + margin.top})'>
    </g>
</svg>
import { scaleOrdinal, scaleRadial } from "d3-scale";

export const getColor = (technologies, technology) => {
    const ordinalScale = scaleOrdinal()
        .domain(technologies?.children?.map(d => d.name) || [])
        .range(technologies?.children?.map(d => d.color) || []);
    
    return ordinalScale(technology)
};

export const getRadius = (maxYears, years) => {

    const radialScale = scaleRadial()
        .domain([0, maxYears])
        .range([0, 30]);
    
    return radialScale(years);
}
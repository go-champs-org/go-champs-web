export const mapEntities = (entitiesMap: { [key: string]: any }, apiData: any) => {
    return {
        ...entitiesMap,
        [apiData.id]: {
            id: apiData.id,
            name: apiData.name,
            slug: apiData.slug,
        },
    };
};
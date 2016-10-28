module.exports = (dato, root) => {
  root.createDataFile('src/data/site.yml', 'yaml', dato.site.toMap());

  dato.singleInstanceItemTypes.forEach(itemType => {
    const item = dato.itemsOfType(itemType)[0];
    if (item) {
      root.createDataFile(`src/data/${itemType.apiKey}.yml`, 'yaml', item.toMap());
    }
  });

  dato.collectionItemTypes.forEach(itemType => {
    root.directory(`src/${itemType.apiKey}/`, dir => {
      dato.itemsOfType(itemType).forEach(item => {
        dir.createPost(`${item.slug()}.md`, 'yaml', { frontmatter: item.toMap() });
      });
    });
  });
};

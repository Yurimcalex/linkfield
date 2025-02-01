const blockDelimiter = '---------------------------------------------------------';
const linkDelimiter = '\n\n';
const linkItemDelimiter = '\n';

export default function parseText(text) {
  return {
    data: text
      .split(blockDelimiter)
      .filter(isntEmpty)
      .map(trimEmptyEdges)
      .map(parseBlock),

    getCategories() {
      return this.data.map(d => d.title);
    },

    getCategoryLinkTypes(category) {
      const types = this.data
        .find(d => d.title === category)
        .links.map(link => link.type);
      return Array.from(new Set(types));
    },

    getCategoryLinks(category) {
      return this.data.find(d => d.title === category).links;
    },

    getLinkTypes() {
      const types = this.data
        .map(d => d.links)
        .reduce((acc, links) => [...acc, ...links], [])
        .map(link => link.type);
      return Array.from(new Set(types));
    },

    countLinkItems(category) {
      return this.data.find(d => d.title === category).links.length;
    },

    getLinks() {
      return this.data.reduce((acc, item) => [...acc, ...item.links], []);
    }
  }
}


function isntEmpty(str) { return !!str; }


function trimEmptyEdges(str) { return str.trim(); }


function parseLink(str, title) {
  const linkData = str.split(linkItemDelimiter);
  return {
    description: linkData[0],
    src: linkData[1],
    type: linkData[2] ? linkData[2].slice(3) : '',
    category: title
  };
}


function parseBlock(str) {
  const blockData = str.split(linkDelimiter);
  const title = blockData[0].slice(2);
  return {
    title,
    links: blockData.slice(1).map((str) => {
      return parseLink(str, title);
    })
  };
}
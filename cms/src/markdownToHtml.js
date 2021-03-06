import remark from 'remark'
import remarkHtml from 'remark-html'
import visit from 'unist-util-visit'
import join from 'url-join'


export default ({ markdown, base, getAsset }) => {
  return remark()
    .use(() => (tree) => {
      visit(tree, 'image', (node) => {
        const url = String(node.url);
        
        if (url.includes('global_media')) {
          // remove the cms/ preview from the preview the cms folder is what is deployed
          node.url = getAsset(url).toString().replace('cms/', '')
        } else {
          node.url = join(
            `https://raw.githubusercontent.com/SparkPost/support-docs/master/`,
            base,
            url
          )
        }
      })
    })
    .use(remarkHtml)
    .processSync(markdown).toString()
}
export function backUrl(ele, url) {
  var thisView = ele.$store.state.tagsView.visitedViews.find(r => r.fullPath === ele.$route.fullPath)
  ele.$store.dispatch('delView', thisView).then(() => {
    var backView = ele.$store.state.tagsView.visitedViews.find(r => r.fullPath === url)
    if (backView != null) {
      ele.$store.dispatch('delCachedView', backView).then(() => ele.$nextTick(() => ele.$router.replace({path: '/redirect' + backView.fullPath})))
    } else {
      ele.$router.push({path: url})
    }
  })
}

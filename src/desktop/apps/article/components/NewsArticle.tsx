import React, { Component, Fragment } from 'react'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import Waypoint from 'react-waypoint'

interface Props {
  article: any
  isMobile: boolean
  isTruncated: boolean
  isFirstArticle: boolean
  nextArticle: any
  onDateChange: any
}

interface State {
  isTruncated: boolean
}

export class NewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false
    }
  }

  onExpand = () => {
    this.setState({
      isTruncated: false
    })
  }

  onEnter = ({ previousPosition, currentPosition }) => {
    const { article, onDateChange } = this.props
    const { isTruncated } = this.state
    const enteredArticle =
      previousPosition === 'above' && currentPosition === 'inside'

    if (enteredArticle) {
      onDateChange(article.published_at)
      if (!isTruncated) {
        this.setMetadata(article)
      } else {
        this.setMetadata()
      }
    }
  }

  onLeave = ({ previousPosition, currentPosition }) => {
    const {
      nextArticle,
      onDateChange
    } = this.props

    if (
      nextArticle &&
      previousPosition === 'inside' &&
      currentPosition === 'above'
    ) {
      onDateChange(nextArticle.published_at)
      // if (nextArticle.isTruncated === false) {
      //   this.setMetadata(nextArticle)
      // } else {
      //   this.setMetadata()
      // }
      this.setMetadata()
    }
  }

  setMetadata = (article: any = null) => {
    const id = article ? article.id : 'news'
    const path = article ? `/news/${article.slug}` : '/news'
    document.title = article ? article.thumbnail_title : 'News'
    window.history.replaceState({}, id, path)
  }

  render() {
    const {
      article,
      isMobile,
      isTruncated,
      isFirstArticle
    } = this.props
    const marginTop = isMobile ? '100px' : '200px'

    return (
      <Fragment>
        <Article
          article={article}
          isTruncated={isTruncated}
          isMobile={isMobile}
          marginTop={isFirstArticle ? marginTop : null}
          onExpand={this.onExpand}
        />
        <Waypoint
          onEnter={(waypointData) => this.onEnter(waypointData)}
          onLeave={(waypointData) => this.onLeave(waypointData)}
          topOffset="200px"
        />
      </Fragment>
    )
  }
}

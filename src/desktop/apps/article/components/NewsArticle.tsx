import React, { Component, Fragment } from 'react'
import { Article } from '@artsy/reaction/dist/Components/Publishing'
import 'intersection-observer'
import Observer from '@researchgate/react-intersection-observer'

interface Props {
  article: any
  isMobile: boolean
  isTruncated: boolean
  isFirstArticle: boolean
  nextArticle: any
  onDateChange: (date: string) => void
}

interface State {
  isTruncated: boolean
  isHovered: boolean
}

export class NewsArticle extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated || false,
      isHovered: false
    }
  }

  onExpand = () => {
    const { article } = this.props
    this.setMetadata(article)
    this.setState({
      isTruncated: false
    })
  }

  setMetadata = (article: any = null) => {
    const id = article ? article.id : 'news'
    const path = article ? `/news/${article.slug}` : '/news'
    document.title = article ? article.thumbnail_title : 'News'
    window.history.replaceState({}, id, path)
  }

  onEnter = ({ previousPosition, currentPosition }) => {
    const {
      article,
      onDateChange
    } = this.props
    const { isTruncated } = this.state

    if (currentPosition === 'inside') {
      if (previousPosition === 'above') {
        onDateChange(article.published_at)
      }

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

    if (currentPosition === 'inside' && previousPosition === 'below') {
      if (nextArticle) {
        onDateChange(nextArticle.published_at)
      }
    }
  }

  onChange = (e) => {
    const {
      article,
      isMobile
    } = this.props
    const { isTruncated } = this.state

    if (e.isIntersecting) {
      if (!isTruncated) {
        this.setMetadata(article)
      } else {
        this.setMetadata()
      }
      if (isMobile) {
        this.setState({ isHovered: true })
      }
    }
  }

  render() {
    const {
      article,
      isMobile,
      isTruncated,
      isFirstArticle
    } = this.props
    const { isHovered } = this.state
    const marginTop = isMobile ? '100px' : '200px'

    return (
      <Fragment>
        <Observer
          onChange={this.onChange}
          rootMargin={"0% 0% -40%"}
        >
          <Article
            article={article}
            isTruncated={isTruncated}
            isMobile={isMobile}
            marginTop={isFirstArticle ? marginTop : null}
            onExpand={this.onExpand}
            isHovered={isHovered}
          />
        </Observer>
      </Fragment>
    )
  }
}

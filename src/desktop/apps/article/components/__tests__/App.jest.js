import React from 'react'
import { mount } from 'enzyme'
import { data as sd } from 'sharify'
import { Article, Fixtures } from 'reaction/Components/Publishing'
import ArticleLayout from 'desktop/apps/article/components/layouts/Article'
import App from 'desktop/apps/article/components/App'
import { NewsArticle } from 'reaction/Components/Publishing/Fixtures/Articles'

// const EditorialSignupView = sinon.stub()

describe('<App />', () => {
  before(() => {
    sd.APP_URL = 'http://artsy.net'
    sd.CURRENT_PATH =
      '/article/artsy-editorial-surprising-reason-men-women-selfies-differently'
    sd.CURRENT_USER = { id: '123' }
  })

  it('renders a standard article', () => {
    const rendered = mount(
      <App article={Fixtures.StandardArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('StandardLayout')
  })

  it('renders a feature article', () => {
    const rendered = mount(
      <App article={Fixtures.FeatureArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(1)
    rendered.html().should.containEql('FeatureLayout')
  })

  it('renders a series article', () => {
    const rendered = mount(
      <App article={Fixtures.SeriesArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Series')
  })

  it('renders a video article', () => {
    const rendered = mount(
      <App article={Fixtures.VideoArticle} templates={{}} />
    )
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('Video')
  })

  it('renders a news article', () => {
    const rendered = mount(<App article={NewsArticle} templates={{}} />)
    rendered.find(Article).length.should.equal(1)
    rendered.find(ArticleLayout).length.should.equal(0)
    rendered.html().should.containEql('News')
  })
})

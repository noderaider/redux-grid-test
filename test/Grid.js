import reduxGrid from 'redux-grid'
import React from 'react'
import * as ReactVirtualized from 'react-virtualized'
import { connect } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { spy } from 'sinon'
const chai = require('chai')
chai.use(require('chai-enzyme')())
const should = chai.should()

describe('reduxGrid', () => {
  it('exists', () => should.exist(reduxGrid))
  it('should be a function', () => reduxGrid.should.be.a('function'))
  it('throws for no parameters', () => (() => reduxGrid()).should.throw())
  it('should not throw for valid dependencies (React, ReactVirtualized, connect)', () => (() => reduxGrid({ React, ReactVirtualized, connect })).should.not.throw())
  describe('<Grid />', () => {
    const { Grid } = reduxGrid({ React, ReactVirtualized, connect })
    it('should exist', () => should.exist(Grid))
  })
  xdescribe('componentDidMount', () => {
    it('mounts', () => {
      spy(ApiGrid.prototype, 'componentDidMount')
      const wrapper = mount(<ApiGrid />)
      ApiGrid.prototype.componentDidMount.calledOnce.should.be.true
    })
  })
  xdescribe('render', () => {
    context('renders direct data', () => {
      const data =  [ { name: 'jim', age: 26, interest: 'being boring', sex: 'male' }
                    , { name: 'tony', age: 37, interest: 'skydiving', sex: 'male' }
                    , { name: 'lisa', age: 40, interest: 'sleeping', sex: 'female' }
                    , { name: 'dan', age: 20, interest: 'jumping', sex: 'male' }
                    , { name: 'sarah', age: 15, interest: 'eating', sex: 'female' }
                    ]

      const selector = state => state.data.map(({ name, age, interest, sex }) => ({ ['Name']: name, ['Age']: age, ['Is A Dude']: sex === 'male' }))
      it('renders same number of columns as selector', () => {
        const wrapper = shallow(<ApiGrid selector={selector} state={data} />)
      })
    })
  })
})



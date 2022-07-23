import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CTable } from '@coreui/react'
import { Link } from 'react-router-dom'
import Delete from '../../../assets/images/delete.png'
import Edit from '../../../assets/images/edit.png'
import '../index.css'
const AllPosts = () => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState({})
  const [tabActive, setTabActive] = useState('publish')
  const [items, setItems] = useState([])
  const columns = [
    {
      key: 'title',
      label: 'Title',
      _props: { scope: 'col' },
    },
    {
      key: 'category',
      label: 'Category',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Action',
      _props: { scope: 'col' },
    },
  ]
  useEffect(() => {
    const getAllArticles = async () => {
      fetch('http://localhost:5000/allarticles')
        .then((res) => res.json())
        .then((data) => {
          setData(data.data)
          data.data.map((res) => {
            setTotal((prev) => {
              return {
                ...prev,
                [res.Status]: parseInt(prev[res.Status]) + 1 || 1,
              }
            })
          })
        })
    }
    getAllArticles()
  }, [])

  useEffect(() => {
    let newArr = []
    if (data.length !== 0) {
      let filterData = data.filter((myData) => myData.Status === tabActive)
      filterData.forEach((res) => {
        let newObj = {}
        newObj['title'] = res.Title
        newObj['category'] = res.Category
        newObj['action'] = res.Status !== 'trash' && (
          <>
            <img
              src={Delete}
              className="action-icon"
              id={res.Id}
              name="trash"
              onClick={clickEvent}
            />
            <Link to={`/posts/edit-post/${res.Id}`}>
              <img
                src={Edit}
                className="action-icon"
                id={res.Id}
                name="edit"
                onClick={clickEvent}
              />
            </Link>
          </>
        )
        newObj['_cellProps'] = { id: { scope: 'row' } }
        newArr.push(newObj)
      })
      setItems(newArr)
    }
  }, [tabActive, data])
  const handleClickEvent = (e) => {
    setTabActive(e.target.id)
  }
  const clickEvent = (e) => {
    if (data.length !== 0) {
      let filterData = data.filter((res) => parseInt(res.Id) === parseInt(e.target.id))
      if (e.target.name === 'trash') {
        fetch(`http://localhost:5000/article/${filterData[0].Id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: filterData[0].Title,
            content: filterData[0].Content,
            category: filterData[0].category,
            status: e.target.name,
          }),
        })
          .then((res) => res.json())
          .then((data) => window.location.reload())
      }
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Posts</strong>
          </CCardHeader>
          <CCardBody>
            <div>
              <CButton color="primary" id="publish" onClick={handleClickEvent}>
                Published ({total.publish})
              </CButton>
              <CButton color="primary" className="mx-2" id="draft" onClick={handleClickEvent}>
                Drafts ({total.draft})
              </CButton>
              <CButton color="primary" id="trash" onClick={handleClickEvent}>
                Trashed ({total.trash})
              </CButton>
            </div>
            <div>
              <CTable columns={columns} items={items} />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllPosts

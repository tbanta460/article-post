import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import '../index.css'
const AddNew = () => {
  const params = useParams()
  const [statusPost, setStatusPost] = useState('Add Post')
  const [valInput, setValInput] = useState({
    title: '',
    content: '',
    category: '',
    status: '',
  })
  useEffect(() => {
    if (params.id !== undefined) {
      setStatusPost('Edit Post')
      const getAllArticles = async () => {
        fetch(`http://localhost:5000/article/${parseInt(params.id)}`)
          .then((res) => res.json())
          .then((data) => {
            for (let keyObj in valInput) {
              let firstCharToUpper = keyObj.charAt(0).toUpperCase() + keyObj.slice(1)
              setValInput((prev) => {
                return {
                  ...prev,
                  [keyObj]: data.data[0][firstCharToUpper],
                }
              })
            }
          })
      }
      getAllArticles()
    } else {
      setStatusPost('Add Post')
      for (let keyObj in valInput) {
        setValInput((prev) => {
          return {
            ...prev,
            [keyObj]: '',
          }
        })
      }
    }
  }, [params])
  const handleChangeEvent = (e) => {
    setValInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleClickEvent = (e) => {
    if (params.id === undefined) {
      fetch(`http://localhost:5000/article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: valInput.title,
          content: valInput.content,
          category: valInput.category,
          status: e.target.textContent.toLowerCase(),
        }),
      })
        .then((res) => res.json())
        .then((resData) => console.log(resData))
    } else {
      fetch(`http://localhost:5000/article/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: valInput.title,
          content: valInput.content,
          category: valInput.category,
          status: e.target.textContent.toLowerCase(),
        }),
      })
        .then((res) => res.json())
        .then((resData) => console.log(resData))
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{statusPost}</strong>
          </CCardHeader>
          <CCardBody>
            <form>
              <CFormInput
                type="text"
                placeholder="Title"
                name="title"
                aria-label="default input example"
                value={valInput.title}
                onChange={handleChangeEvent}
                className="my-3"
              />
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Content"
                name="content"
                value={valInput.content}
                onChange={handleChangeEvent}
                rows="10"
              ></CFormTextarea>
              <CFormInput
                type="text"
                size="sm"
                placeholder="Category"
                name="category"
                aria-label="sm input example"
                value={valInput.category}
                onChange={handleChangeEvent}
                className="my-3"
              />
              <div>
                <CButton color="primary" className="m-4" onClick={handleClickEvent}>
                  Publish
                </CButton>
                <CButton color="primary" onClick={handleClickEvent}>
                  Draft
                </CButton>
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNew

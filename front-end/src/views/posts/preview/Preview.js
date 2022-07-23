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
  CCardTitle,
  CCardSubtitle,
  CCardText,
} from '@coreui/react'
import '../index.css'
const Preview = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(1)
  const [statusPage, setStatusPage] = useState({})
  useEffect(() => {
    const getAllArticles = async () => {
      fetch(`http://localhost:5000/articles?page=${count}&perPage=5`)
        .then((res) => res.json())
        .then((reData) => {
          console.log(reData, 'tes data')
          setData(reData.data)
          setStatusPage(reData)
        })
    }
    getAllArticles()
  }, [count])
  const handlePrev = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  const handleNext = () => {
    const totalPage = Math.ceil(parseInt(statusPage.totalPosts) / parseInt(statusPage.perPage))
    if (count < totalPage) {
      setCount(count + 1)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Preview</strong>
          </CCardHeader>
          <CCardBody>
            <div className="wrap-card">
              {data.map((resData) => {
                return (
                  resData.Status === 'publish' && (
                    <CCard style={{ width: '18rem' }}>
                      <CCardBody>
                        <CCardTitle>{resData.Title}</CCardTitle>
                        <CCardSubtitle className="mb-2 text-medium-emphasis">
                          {resData.Category}
                        </CCardSubtitle>
                        <CCardText>
                          {resData.Content.length > 50
                            ? resData.Content.slice(0, 80) + '...'
                            : resData.Content}
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  )
                )
              })}
            </div>
            <div className="btn-ccc">
              <CButton color="primary" className="m-4" onClick={handlePrev}>
                Prev
              </CButton>
              {`${statusPage.currentPage} / ${Math.ceil(
                parseInt(statusPage.totalPosts) / parseInt(statusPage.perPage),
              )}`}
              <CButton color="primary" onClick={handleNext}>
                Next
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Preview

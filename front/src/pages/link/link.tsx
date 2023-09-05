import { useState } from 'react';
import { Space, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { notify } from '../../hooks/notification'
import { linksApi } from './store'
import { Wrapper } from '../../components/wrapper';
import { StyledList, StyledListItem } from '../../components/list';
import { BlinkingButton, CustomButtonProps, StyledButton, StyledDisabledButton } from '../../components/btn';
import { logOut } from '../../services/userSlicer';

export const LinkApp = () => {
  const [page, setPage] = useState(1)
  const { data: links, isLoading } = linksApi.useGetAllQuery(page)
  const [deleteLink] = linksApi.useDeleteMutation()
  const [generateLink] = linksApi.useCreateMutation()
  const [link, setLink] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuth } = useSelector((state: any) => state.user);

  const generate = async (val: string) => {
    const result: any = await generateLink(val)
    if (result.data) notify("Success")
    else if (result.error.status === 400) notify(result.error.data.message[0])
    else notify(result.error.data.message)
  }

  const del = async (id: string) => {
    const result: any = await deleteLink(id)
    if (result.error.data === 'success') notify("Success")
    else notify(result.error.data.message[0])
  }

  const CustomButton: React.FC<CustomButtonProps> = ({ currentPage, onClick, text }) => {
    const count = links?.count || 10
    const totalPages: any = Math.ceil(count / 10)
    if (currentPage === 1 && text === 'Prev') {
      return <StyledDisabledButton>{text}</StyledDisabledButton>;
    }
    if (currentPage === totalPages && text === "Next") {
      return <StyledDisabledButton>{text}</StyledDisabledButton>;
    }
    return <StyledButton onClick={onClick}>{text}</StyledButton>;

  };

  return (
    isLoading ? <div>Loading</div>
      :
      <>
        {isAuth ? <StyledButton onClick={() => {
          dispatch(logOut())
          navigate('/auth')
        }
        }>LogOut</StyledButton> : <BlinkingButton onClick={() => navigate('/auth')}> Login </BlinkingButton>}
        <Wrapper>
          <Space.Compact>
            <Input placeholder="Write here your url" onChange={(e) => setLink(e.target.value)} />
            <Button type="primary" onClick={() => generate(link)}>Submit</Button>
          </Space.Compact>
          <StyledList>
            {links?.data.map(item =>
              <StyledListItem key={item._id}>
                <a href={item.newLink} style={{ textDecoration: 'none', color: 'black' }}>{item.newLink}</a>
                <DeleteOutlined style={{ marginLeft: '9px', color: 'red' }} onClick={() => del(item._id)} />
              </StyledListItem>).reverse()}
          </StyledList>
          <div style={{ textAlign: 'center' }}>
            <CustomButton text={'Prev'} currentPage={page} onClick={() => setPage(page - 1)} />
            <CustomButton text={'Next'} currentPage={page} onClick={() => setPage(page + 1)} />
          </div>
        </Wrapper >
      </>

  )
}
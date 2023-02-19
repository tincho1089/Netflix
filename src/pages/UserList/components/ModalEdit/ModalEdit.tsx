import iconEdit from '@/assets/icons/iconEdit.png'
import { EditProfile } from '@/pages/ManageProfiles/components'
import { deleteProfile, initialProfileState, modifyProfile } from '@/redux/states/profile'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconDTO, Profile } from '../../UserList+Helper'
import './ModalEdit.scss'

export interface ModalEditInterface {
  profile: Profile
  closeModal: () => void
}

const ModalEdit: React.FC<ModalEditInterface> = (props) => {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState<Profile>(initialProfileState[0])
  const [value, setValue] = useState('')
  const [newIcon, setNewIcon] = useState<IconDTO>()
  const [openEdit, setOpenEdit] = useState(false)

  // * Methods
  const CloseModal = () => props.closeModal()

  const ModifyProfile = () => {
    dispatch(
      modifyProfile({
        id: profile.id,
        name: value || 'John Doe',
        icon: newIcon && newIcon,
      }),
    )
    CloseModal()
  }

  const DeleteProfile = () => {
    dispatch(deleteProfile(props.profile.id))
    CloseModal()
  }

  // * Life Cycle
  useEffect(() => {
    setProfile(props.profile)
    setValue(props.profile.name)
  }, [])

  return (
    <div className='edit-modal'>
      {openEdit && <EditProfile profile={profile} closeModal={() => setOpenEdit(false)} selectedIcon={setNewIcon} />}
      <div className='edit-modal-container'>
        <div className='edit-modal-content'>
          <div className='edit-modal-title'>Edit Profile</div>
          <div className='edit-modal-divider' />
          <div className='add-modal-main'>
            <div className='edit-modal-img-container'>
              <img
                className='add-modal-img'
                src={newIcon ? newIcon.src : profile.icon.src}
                alt={newIcon ? newIcon.alt : profile.icon.alt}
              />
              <img className='edit-modal-icon' src={iconEdit} alt='edit' onClick={() => setOpenEdit(true)} />
            </div>
            <input value={value} autoFocus onChange={(e) => setValue(e.target.value)} className='add-modal-input' type='text' />
          </div>
          <div className='edit-modal-divider' />
          <div className='add-modal-buttons'>
            <div className='add-modal-button-ok' onClick={ModifyProfile}>
              Save
            </div>
            <div className='add-modal-button-cancel' onClick={CloseModal}>
              Cancel
            </div>
            <div className='add-modal-button-cancel' onClick={DeleteProfile}>
              Delete Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit

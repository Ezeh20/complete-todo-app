import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiShieldUserFill } from 'react-icons/ri'
import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { BiDoorOpen } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { GiExitDoor } from 'react-icons/gi'
import { ImProfile } from 'react-icons/im'
import { darkMode, lightMode } from '../../Redux/themeReducer'
import styles from './Navigation.module.scss'
import Container from '../../Component/Container/container'
import { LogOut } from '../../utils/firebase'
import { UpdateUserContext } from '../../Redux/authListener'

function Navigation() {
  const [active, setActive] = useState(false)
  const currentTheme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()
  const toggleActive = () => setActive((curr) => !curr)
  const { userData, setUserData } = useContext(UpdateUserContext)

  const rr = async () => {
    await LogOut()
    setUserData(null)
  }

  return (
    <div className={styles.navigation}>
      <header className={`${styles.header} header`}>
        <Container>
          <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
              TODO
              <p />
            </Link>
            <div className={styles.userIntra}>
              <div className={styles.themeToggle}>
                {currentTheme === 'light' ? (
                  <BsMoonFill
                    className={styles.userAccount}
                    onClick={() => dispatch(darkMode())}
                  />
                ) : (
                  <BsFillSunFill
                    className={styles.userAccount}
                    onClick={() => dispatch(lightMode())}
                  />
                )}
              </div>
              <RiShieldUserFill
                className={styles.userAccount}
                onClick={toggleActive}
              />
            </div>
            <div
              className={`${
                active === true
                  ? `${`${styles.auth} ${styles.authActive}`}`
                  : `${styles.auth}`
              }`}
            >
              {userData ? (
                <div className={styles.authUser}>
                  <button type="button" className={styles.login} onClick={rr}>
                    <GiExitDoor /> <p>logout</p>
                  </button>
                  <button type="button">
                    <Link to="/profile" className={styles.login}>
                      <ImProfile /> Profile
                    </Link>
                  </button>
                </div>
              ) : (
                <button type="button">
                  <Link to="/login" className={styles.login}>
                    <BiDoorOpen /> <p>Login</p>
                  </Link>
                </button>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Navigation

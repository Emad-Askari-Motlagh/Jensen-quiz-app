import React from "react";
import styles from "./Footer.module.scss";
import { GrFacebook } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function PageTwo() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer__col1}>
          <div className={styles.footer__col2}>
            <Link to="www.facebook.com">
              <GrFacebook size={16} color="gray" />
            </Link>

            <Link to="www.twitter.com">
              <AiFillTwitterCircle
                id="twitter-address"
                size={16}
                color="gray"
              ></AiFillTwitterCircle>
            </Link>

            <Link to="/404">
              <ImMail4 size={16} color="gray" />
            </Link>
          </div>
          <Link to="/terms/terms">Term and Conditions</Link>

          <div className={styles.footer__invention}>
            <div> AllianceCodes ©2021</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

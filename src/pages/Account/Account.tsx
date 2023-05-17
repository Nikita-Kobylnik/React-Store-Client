import React from "react";
import "./Account.scss";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";

type Props = {};

const Account = (props: Props) => {
  return (
    <>
      <Header />
      <section className="account">
        <Container>
          <div className="account__inner">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            unde voluptatum eligendi assumenda. Sequi corrupti reprehenderit
            aut, quam consequuntur hic et amet, doloribus consectetur in tempora
            animi. Possimus, minima cum.
          </div>
        </Container>
      </section>
    </>
  );
};

export default Account;

import "./cart.styles.scss";
import { getCartItems } from "../../utils/api";
import { useState, useEffect } from "react";
import CartList from "../../components/cart-list/cart-list.component";
import Spinner from "../../components/spinner/spinner.component";
import Btn from "../../components/btn/btn.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPurchaseList } from "../../redux/user/user.selectors";

function CartPage({ purchaseList }) {
  const [cartList, setCartList] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        setIsFetching(true);
        const { data: cartItems } = await getCartItems();
        setCartList(cartItems);
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log({ error });
      }
    })();
  }, []);

  return (
    <div className="cart-page">
      <h1 className="__heading">My Cart</h1>
      {cartList && cartList?.length > 0 && (
        <h3 className="__heading colored">select items to buy</h3>
      )}
      {isFetching ? (
        <Spinner page />
      ) : (
        <div className="container">
          <CartList list={cartList} />
          {purchaseList.length > 0 && (
            <div className="btn-container">
              <Link to="/checkout">
                <Btn>Checkout</Btn>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  purchaseList: selectPurchaseList,
});
export default connect(mapStateToProps)(CartPage);

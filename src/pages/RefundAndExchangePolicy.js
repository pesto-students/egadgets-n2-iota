import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
class RefundAndExchangePolicy extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Container>
        <h2 className="text-align-center p-10"> Refund & Exchange Policy</h2>
        <Typography variant="subtitle2" className="p-10 text-justify ">
          Returns Please review our Returns Policy, which applies to products
          sold by us
        </Typography>
        <Typography variant="body1" className="p-10 text-justify">
          Pricing and availability We list availability information for products
          sold by us on the website, including on each product information page.
          Beyond what we say on that page or otherwise on the website, we cannot
          be more specific about availability. Please note that dispatch
          estimates are just that. They are not guaranteed dispatch times and
          should not be relied upon as such. As we process your order, you will
          be informed by e-mail if any products you order turn out to be
          unavailable. For more details, please review our Pricing policy and
          our Availability Guide, both of which apply to products ordered from
          us. All prices are inclusive of VAT/CST, service tax, Goods and
          Services Tax ("GST"), duties and cesses as applicable - unless stated
          otherwise. 5. Taxes You shall be responsible for payment of all
          fees/costs/charges associated with the purchase of products from us
          and you agree to bear any and all applicable taxes including but not
          limited to VAT/CST, service tax, GST, duties and cesses etc.
        </Typography>

        <Typography variant="subtitle2" className="p-10">
          General Rules for a successful Return
        </Typography>
        <div className="pl-15">
          <ul className="p-10 text-justify">
            <li>
              <Typography variant="body1">
                In certain cases where the seller is unable to process a
                replacement for any reason whatsoever, a refund will be given.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                During open box deliveries, while accepting your order, if you
                received a different or a damaged product, you will be given a
                refund (on the spot refunds for cash-on-delivery orders). Once
                you have accepted an open box delivery, no return request will
                be processed, except for manufacturing defects. In such cases,
                this category-specific replacement/return general conditions
                will be applicable.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                For products where installation is provided by EGadgets's
                service partners, do not open the product packaging by yourself.
                EGadgets authorised personnel shall help in unboxing and
                installation of the product.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                For Furniture, any product related issues will be checked by an
                authorised service personnel (free of cost) and attempted to be
                resolved by replacing the faulty/ defective part of the product.
                Full replacement will be provided only in cases where the
                service personnel opines that replacing the faulty/defective
                part will not resolve the issue.
              </Typography>
            </li>
          </ul>
        </div>
      </Container>
    );
  }
}

export default RefundAndExchangePolicy;

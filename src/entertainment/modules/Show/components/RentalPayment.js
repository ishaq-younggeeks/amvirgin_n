import React, { Component, useState } from 'react'

const paymentTypeList = {
	Card: "CREDIT / DEBIT CARD",
	NetBank: "NET BANKING",
	BhimUpi: "PHONEPE / GOOGLE PAY / BHIM UPI",
	Wallet: "Select Wallet to pay",

}

const RentalPayment = () => {

	const [render, setRender] = useState("Card")


	const selectPayment = (compName, e) => {
		e.preventDefault();
		setRender(compName);
	};
	return (
		<>
			<div className="row setup-content" id="step-4">
				<div className="stepsection">
					<div className="">
						<div className="container">
							<div className="addresspart">
								<div className="leftsection">
									<div className="body-style paymentsection">
										<div className="tab">
											<button
												className="tablinks tab-one"
												onClick={(e) => selectPayment("Card", e)}
												id="defaultOpen"
											>
												CREDIT / DEBIT CARD{" "}
											</button>
											<button
												className="tablinks"
												onClick={(e) => selectPayment("NetBank", e)}
											>
												{" "}
                        NET BANKING{" "}
											</button>
											<button
												className="tablinks"
												onClick={(e) => selectPayment("BhimUpi", e)}
											>
												{" "}
                        PHONE PE / GOOGLE PAY / BHIM UPI{" "}
											</button>
											<button
												className="tablinks"
												onClick={(e) => selectPayment("Wallet", e)}
											>
												{" "}
                        WALLETS{" "}
											</button>
										</div>
										<div id="BHIM" className="tabcontent walletradio">
											<h3 className="credit-card">{paymentTypeList[render]}</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RentalPayment;



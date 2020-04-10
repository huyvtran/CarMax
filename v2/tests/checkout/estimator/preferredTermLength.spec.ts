import { register, arrangeTestSession, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import TradeInPage from '../../../pages/checkout/estimator/trade-in';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import EstimatorResultPage from '../../../pages/checkout/estimator/estimatorResultPage';

describe('Estimator V2, ', () => {
    const checkoutPage: CheckoutPage = new CheckoutPage(1002);
    const tradeInPage: TradeInPage = new TradeInPage(1002);
    const estimatorResultPage: EstimatorResultPage = new EstimatorResultPage(1002);
    const user: User = new User();

    before(() => {
        console.log(`The current user under test is: ${user.userName}`);
        arrangeTestSession(RegisterPage.url);
        register(user);
        browser.url(checkoutPage.startProgressionUrl());
        checkoutPage.open();
        waitUntilUrlIncludes("vehicle-history");
        checkoutPage.saveAndContinueButton.click();
        waitUntilUrlIncludes("trade-in");
    });
    it('The Estimator returns a value when using a valid VIN No', () => {
        tradeInPage.iLikeTradeInEstimateButton.click();
        tradeInPage.saveAndcontinueButton.click();
        waitUntilUrlIncludes("trade-in");
        tradeInPage.vinButton.click();
        tradeInPage.vinNoField.setValue('WBY1Z4C53FV278751');
        tradeInPage.currentMileageInput.setValue('99000');
        tradeInPage.getMyEstimateButton.click();
        estimatorResultPage.estimatorResultPageHeaderText('Your CarMax estimate');
    });
    it('validate preferred term length options', () => {
        estimatorResultPage.preferredTermLengthField.click();
        browser.pause(1000);
        estimatorResultPage.sixtyMonths.click();
        estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('60 mo.');

        estimatorResultPage.sixtyMonths.click();
        browser.pause(1000);
        estimatorResultPage.fortyEightMonths.click();
        estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('48 mo.');

        estimatorResultPage.fortyEightMonths.click();
        browser.pause(1000);
        estimatorResultPage.thirtySixMonths.click();
        estimatorResultPage.preferredTermLengthFieldInSummary.getText().should.equal('36 mo.');
    });
}); 
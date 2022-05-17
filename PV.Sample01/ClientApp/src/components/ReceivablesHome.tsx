import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Container, Input, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as _receivable from '../store/Receivable';
import { ReceivableState, IReceivableInput } from '../store/interfaces';
import './Generic.css';

type ReceivableProps = ReceivableState
    & typeof _receivable.actionsReceivables
    & RouteComponentProps<{ startDateIndex: string }>;


class ReceivableData extends React.PureComponent<ReceivableProps> {

    // This method is called when the component is first added to the document
    /*public componentDidMount() {
        this.ensureReceivables();
    }*/

    // This method is called when the route parameters change
    /*public componentDidUpdate() {
        this.ensureReceivables();
    }*/
    constructor(props: any) {
        super(props);
        props.isSync === true;
        props.requestReceivable();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    {this.rederTopInformation()}
                    {this.renderToReceivableTable()}
                    {this.renderToReceivableHistoryTable()}
                </Container>
            </React.Fragment>
        );
    }

    private ensureReceivables() {
        this.props.requestReceivable();
    }

    private rederTopInformation() {
        return (
            <div>
                <Container>
                    <Row className="row" >
                        <Col>
                            <div>
                                <span>Comunicação</span>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <input type="radio" className="radio" name="comunication" defaultChecked onClick={() => this.props.isSync === true} /> Synchronous
                                <input type="radio" className="radio" name="comunication" onClick={() => this.props.isSync === false} /> Asynchronous
                            </div>
                        </Col>
                    </Row>
                    <Row className="row" >
                        <Col>
                            <div>
                                <span>Valor Total em Carteira</span>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <span>$ 188.00</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="row" >
                        <Col>
                            <div>
                                <span>Valor Elegível</span>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <span>$ 100.00</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    private renderToReceivableTable() {
        return (<div>
            <Container>
                <Row className="row" >
                    <Col sm={8} >
                        <div>
                            <span>Opçoes de Recebíves</span>
                        </div>
                    </Col>
                    <Col>
                        <div className="div-buton">
                            <button type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => { this.props.requestAddReceivable() }}>
                                Add Recebível
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row className="row" >
                    <Col>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th className="th-center"><Input type="checkbox" /></th>
                                    <th>Produto</th>
                                    <th>Bandeira</th>
                                    <th>Data</th>
                                    <th>CNPj</th>
                                    <th>Valor Bruto</th>
                                    <th>Descontos</th>
                                    <th>Valor Líquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.receivables.filter(f => f.currentStatus === "Created").map((receivable: IReceivableInput) =>
                                    <tr key={receivable.product}>
                                        <td className="th-center">
                                            <Input type="checkbox"
                                                defaultChecked={receivable.selected}
                                                onChange={() => receivable.selected = true }
                                            /></td>
                                        <td>{receivable.product}</td>
                                        <td>{receivable.flag}</td>
                                        <td>{receivable.date}</td>
                                        <td>{receivable.document}</td>
                                        <td>{receivable.grossValue}</td>
                                        <td>{receivable.discount}</td>
                                        <td>{receivable.value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="row" >
                    <Col>
                        <div className="div-buton">
                            <button type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => { this.props.requestApplyReceivable(this.props.receivables) }}>
                                Antecipar
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    }

    private renderToReceivableHistoryTable() {
        return (
            <Container>
                <Row className="row" >
                    <Col>
                        <div>
                            <span>Ultimas Antecipações</span>
                        </div>
                    </Col>
                </Row>
                <Row className="row" >
                    <Col>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Bandeira</th>
                                    <th>Data</th>
                                    <th>CNPj</th>
                                    <th>Taxa Antec.</th>
                                    <th>valor Bruto</th>
                                    <th>Descontos</th>
                                    <th>Valor Líquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.receivables.filter(f => f.currentStatus !== "Created").map((receivable: IReceivableInput) =>
                                    <tr key={receivable.product}>
                                        <td>{receivable.currentStatus}</td>
                                        <td>{receivable.product}</td>
                                        <td>{receivable.flag}</td>
                                        <td>00</td>
                                        <td>{receivable.document}</td>
                                        <td>{receivable.grossValue}</td>
                                        <td>{receivable.discount}</td>
                                        <td>{receivable.value}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.receivable,
    _receivable.actionsReceivables
)(ReceivableData as any);

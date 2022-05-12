import * as React from 'react';
import format from 'date-fns/format'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Container, Input, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as _receivable from '../store/Receivable';

type ReceivableProps = _receivable.ReceivableState
    & typeof _receivable.actionCreators
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
                    <Row>
                        <Col>
                            <div>
                                <span>Comunicação</span>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <input type="radio"  name="comunication" onClick={() => this.props.isSync === true} /> Synchronous
                                <input type="radio"  name="comunication" onClick={() => this.props.isSync === false}  /> Asynchronous
                            </div>
                        </Col>
                    </Row>
                    <Row>
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
                    <Row>
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
                <Row>
                    <Col>
                        <div>
                            <span>Opçoes de Recebíves</span>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <button type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => { this.props.requestReceivable() }}>
                                Atualizar
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <table className='table table-striped' aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <th><Input type="checkbox"/></th>
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
                                {this.props.receivables.map((receivable: _receivable.ReceivableInput) =>
                                    <tr key={receivable.product}>
                                        <td><Input type="checkbox" checked={receivable.selected} /></td>
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
            </Container>
        </div>
        );
    }

    private renderToReceivableHistoryTable() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div>
                            <span>Ultimas Antecipações</span>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <button type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => { this.props.requestReceivable() }}>
                                Atualizar
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row>
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
                                {this.props.receivables.map((receivable: _receivable.ReceivableInput) =>
                                    <tr key={receivable.product}>
                                        <td>Status</td>
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
    _receivable.actionCreators
)(ReceivableData as any);
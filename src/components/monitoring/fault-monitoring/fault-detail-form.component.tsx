'use client';

import { ButtonComponent, Cell, Column, Row, Table, TableBody, TableHeader } from '@/components';
import { Heading, TextArea, TextField } from 'react-aria-components';

interface FaultDetailFormProps {}

const FaultInfoTable = () => (
  <div style={{paddingTop:"4px"}}>
    <Heading level={4}>장애정보</Heading>
    <h3 id="caption" className="sr-only">
      장애 상세 정보 표
    </h3>
    <p id="summary" className="sr-only">
      장애상태, 장치명, 임계치, 장애등급, 위치, 코드 등을 표시한 표입니다.
    </p>
    <Table data-table-type="vertical" aria-labelledby="caption" aria-describedby="summary">
      <TableHeader className="sr-only">
        <Column isRowHeader></Column>
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
      </TableHeader>
      <TableBody>
        <Row>
          <Cell data-scope="row">장애 상태</Cell>
          <Cell>발생</Cell>
          <Cell data-scope="row">장치 명</Cell>
          <Cell>DEJN_BB_SW</Cell>
          <Cell data-scope="row">임계치</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">장애 등급</Cell>
          <Cell>critical</Cell>
          <Cell data-scope="row">장애발생위치</Cell>
          <Cell colSpan={3}>if_Index.38305792</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">장애코드</Cell>
          <Cell>A9990</Cell>
          <Cell data-scope="row">장애 명</Cell>
          <Cell>3003</Cell>
          <Cell data-scope="row">발생 시간</Cell>
          <Cell>2025-01-10 10:50:45</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">인지 시간</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">복구 시간</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">복구자 명</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">장비 제조사</Cell>
          <Cell>삼성전자</Cell>
          <Cell data-scope="row">이장 시간</Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Row>
        <Row>
          <Cell data-scope="row">장애 설명</Cell>
          <Cell colSpan={5}>ENB ACCESS FAIL ALARM ENB와 접속이 불가</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">서비스 영향</Cell>
          <Cell colSpan={5}>일부 전력 생산 추적 불가</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">발생 원인</Cell>
          <Cell colSpan={5}>연결불량</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">확인 방법</Cell>
          <Cell colSpan={5}>연결 확인</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">조치 방법</Cell>
          <Cell colSpan={5}>연결 상태 확인 체크 진행 필요</Cell>
        </Row>
      </TableBody>
    </Table>
  </div>
);
const FaultMaintainTable = () => (
  <div>
    <Heading level={4}>유지보수</Heading>
    <h3 id="caption" className="sr-only">
      장애 상세 정보 표
    </h3>
    <p id="summary" className="sr-only">
      장애상태, 장치명, 임계치, 장애등급, 위치, 코드 등을 표시한 표입니다.
    </p>
    <Table data-table-type="vertical" cellWidth={180} aria-labelledby="caption" aria-describedby="summary">
      <TableHeader className="sr-only">
        <Column isRowHeader></Column>
        <Column />
        <Column />
        <Column />
        <Column />
        <Column />
      </TableHeader>
      <TableBody>
        <Row>
          <Cell data-scope="row">유지보수 담당자(정)</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">유지보수사(정)</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">유지보수사(부)</Cell>
          <Cell>-</Cell>
        </Row>
        <Row>
          <Cell data-scope="row">유지보수 담당자(정)</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">유지보수 연락처(정)</Cell>
          <Cell>-</Cell>
          <Cell data-scope="row">유지보수 연락처 (부)</Cell>
          <Cell>-</Cell>
        </Row>
      </TableBody>
    </Table>
  </div>
);

const FaultContTable = () => (
  <div>
    <Heading level={4}>장애 내역</Heading>
    <TextField isReadOnly>
    <TextArea value="[eNB] GURO-EMS-LSM12 2024-11-20 11:42:22.000 ** A2116378 OPTIC TRANSCEIVER RX LOS ALARM NETWORKELEMENT = DU008030268811 LOCATION = DU008030268811/eNB_67615/RACK[0]/SHELF[0]/SLOT[1]-ECP[0]/A_SIDE/CPRI_PORT[4] EVENTTYPE = EQUIPMENT ALARM PROBABLECAUSE = LINE INTERFACE FAILURE SPECIFICPROBLEM = OPTIC TRANSCEIVER RX LOS" />    </TextField>
  </div>
);

export const FaultDetailForm: React.FC<FaultDetailFormProps> = ({}) => {
  return (
    <>
      <FaultInfoTable />
      <FaultMaintainTable />
      <FaultContTable />

      <div>
        <div className="button-group">
          <ButtonComponent variant="contained">메모 저장</ButtonComponent>
        </div>
        <TextField>
          <TextArea value="" /> 
        </TextField>
      </div>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { MdSync, MdCancel } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import {
  ListStatement,
  Icon,
  Info,
  Header,
  SubHeader,
  ValueFormatted,
  ItemSkeleton
} from './styles';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';

import { store } from '~/store';
import api from '~/services/api';
import { formatMoney } from '~/utils/format';

export default function BankStatement() {
  const [loading, setLoading] = useState(false);
  const [bankStatement, setBankStatement] = useState([]);

  useEffect(() => {
    const { user } = store.getState().session;

    async function loadBankStatements() {
      setLoading(true);
      const response = await api.get('/bank-statements');
      const formatData = response.data.map(statement => ({
        ...statement,
        valueFormatted: formatMoney(statement.value),
        createdAtFormatted: format(
          parseISO(statement.created_at),
          'dd/MM HH:mm'
        ),
        out: statement.from_user.id === user.id,
      }));

      setBankStatement(formatData);
      setLoading(false);
    }

    loadBankStatements();
  }, []);

  return (
    <PageContainer>
      <PageTitle title="Extrato" />
      {loading && <Card >
        <ItemSkeleton>
          <Skeleton count={10} height={50} />
        </ItemSkeleton>
      </Card>}

      {!loading && (
        <Card>
          {!bankStatement ||
            (!bankStatement.length && 'Nenhuma ação realizada')}
          <ListStatement>
            {bankStatement &&
              bankStatement.map(statement => (
                <li key={statement.id}>
                  <Icon success={statement.status === 'success'}>
                    {statement.status === 'success' && <MdSync size={30} />}
                    {statement.status !== 'success' && <MdCancel size={30} />}
                  </Icon>
                  <Info>
                    <Header>
                      <h3>Transferência EKKI</h3>
                      <ValueFormatted
                        out={statement.out}
                        success={statement.status === 'success'}
                      >
                        {statement.out ? '-' : '+'} {statement.valueFormatted}
                      </ValueFormatted>
                    </Header>
                    <SubHeader>
                      <h4>Para {statement.to_user.name}</h4>
                      <h4>{statement.createdAtFormatted}</h4>
                    </SubHeader>
                  </Info>
                </li>
              ))}
          </ListStatement>
        </Card>
      )}
    </PageContainer>
  );
}

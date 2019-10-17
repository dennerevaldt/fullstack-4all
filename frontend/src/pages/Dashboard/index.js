import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import PageContainer from '~/components/PageContainer';
import PageTitle from '~/components/PageTitle';
import Card from '~/components/Card';

import api from '~/services/api';
import { formatMoney } from '~/utils/format';

import { Container } from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [limit, setLimit] = useState(0);
  const [availableLimit, setAvailableLimit] = useState(0);

  useEffect(() => {
    async function loadBalance() {
      setLoading(true);
      const response = await api.get('/balances');
      const formatBalance = formatMoney(response.data.balance);
      const formatLimit = formatMoney(response.data.limit);
      const formatAvailableLimit = formatMoney(response.data.available_limit);
      setBalance(formatBalance);
      setLimit(formatLimit);
      setAvailableLimit(formatAvailableLimit);
      setLoading(false);
    }

    loadBalance();
  }, []);

  return (
    <PageContainer>
      <PageTitle title="Dashboard" />
      <Container>
        <Card>
          <h3>Saldo Atual</h3>
          <p>{loading ? <Skeleton /> : balance}</p>
        </Card>
        <Card>
          <h3>Limite atual</h3>
          <p>{loading ? <Skeleton /> : limit}</p>
        </Card>
        <Card>
          <h3>Limite disponível</h3>
          <p>{loading ? <Skeleton /> : availableLimit}</p>
        </Card>
      </Container>
    </PageContainer>
  );
}

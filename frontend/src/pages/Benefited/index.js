import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MdAttachMoney, MdEdit, MdDelete, MdAdd } from 'react-icons/md';

import api from '~/services/api';

import { List, Info, Action, ActionButton, ItemSkeleton } from './styles';

import PageContainer from '~/components/PageContainer';
import PageTitle from '~/components/PageTitle';
import Card from '~/components/Card';
import TitleSweet from '~/components/TitleSweet';
import FormTransference from '~/components/FormTransference';
import FormBenefited from '~/components/FormBenefited';
import { maskConstants } from '~/constants/masks';
import { tranformCharacters } from '~/utils/replace';

export default function Benefited() {
  const [loading, setLoading] = useState(false);
  const [benefited, setBenefited] = useState([]);

  useEffect(() => {
    async function loadBenefited() {
      setLoading(true);
      const response = await api.get('/benefited');
      const formatData = response.data.map(ben => ({
        ...ben,
        cpf: tranformCharacters(ben.cpf, maskConstants.CPF),
        phone: tranformCharacters(ben.phone, maskConstants.PHONE),
      }));
      setBenefited(formatData);
      setLoading(false);
    }

    loadBenefited();
  }, []);

  const removeBenefited = async (ben, swalConfirm) => {
    try {
      const response = await api.delete(`/benefited/${ben.id}`);
      const list = [...benefited]; // make a separate copy of the array
      const index = list.indexOf(ben);
      if (index !== -1) {
        list.splice(index, 1);
        setBenefited(list);
      }
      return response.data;
    } catch (error) {
      return swalConfirm.showValidationMessage(`Falha na ação: ${error}`);
    }
  };

  const handleConfirmDelete = async ben => {
    const swalConfirm = withReactContent(Swal);

    await swalConfirm.fire({
      title: (
        <TitleSweet
          title="Excluir"
          message={`Você deseja realmente excluir ${ben.name}?`}
        />
      ),
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-cancel',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
      confirmButtonAriaLabel: 'Sim',
      cancelButtonAriaLabel: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !swalConfirm.isLoading(),
      preConfirm: () => removeBenefited(ben),
    });
  };

  const handleDoTransfer = async ben => {
    const swalTransference = withReactContent(Swal);

    await swalTransference.fire({
      title: (
        <TitleSweet
          title="Transferência"
          message={`Quanto você deseja transferir para ${ben.name}?`}
        />
      ),
      showConfirmButton: false,
      showCancelButton: false,
      html: <FormTransference swal={swalTransference} benefited={ben} />,
    });
  };

  const updateCallbackBenefited = (key, value) => {
    if (key === 'update') {
      const list = [...benefited];
      const item = list.find(ben => ben.id === value.id);
      const index = list.indexOf(item);
      list[index] = value;
      return setBenefited(list);
    }
    const list = [...benefited, value];
    return setBenefited(list);
  };

  const handleManageBenefited = async ben => {
    const swalBenefited = withReactContent(Swal);

    await swalBenefited.fire({
      title: (
        <TitleSweet title={ben ? 'Editar beneficiado' : 'Novo beneficiado'} />
      ),
      showConfirmButton: false,
      showCancelButton: false,
      html: (
        <FormBenefited
          swal={swalBenefited}
          benefited={ben}
          updateCallback={updateCallbackBenefited}
        />
      ),
    });
  };

  return (
    <PageContainer>
      <PageTitle title="Beneficiados">
        <ActionButton border onClick={() => handleManageBenefited()}>
          Adicionar novo <MdAdd size={14} />
        </ActionButton>
      </PageTitle>
      <Card>
        {loading &&
          <ItemSkeleton>
            <Skeleton count={10} height={50} />
          </ItemSkeleton>
        }
        {!loading && (
          <List>
            {!benefited ||
              (!benefited.length && 'Nenhum beneficiado encontrado')}
            {benefited &&
              benefited.map(ben => (
                <li key={ben.id}>
                  <Info>
                    <h3>{ben.name}</h3>
                    <h4>{ben.cpf}</h4>
                    <h4>{ben.phone}</h4>
                  </Info>
                  <Action>
                    <ActionButton onClick={() => handleDoTransfer(ben)}>
                      Transferir
                      <MdAttachMoney size={14} />
                    </ActionButton>
                    <ActionButton onClick={() => handleManageBenefited(ben)}>
                      Editar
                      <MdEdit size={12} />
                    </ActionButton>
                    <ActionButton
                      delete={1}
                      onClick={() => handleConfirmDelete(ben)}
                    >
                      Excluir
                      <MdDelete size={12} />
                    </ActionButton>
                  </Action>
                </li>
              ))}
          </List>
        )}
      </Card>
    </PageContainer>
  );
}

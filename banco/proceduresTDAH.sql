SET GLOBAL log_bin_trust_function_creators = 1;

Delimiter $$

/* Procedure para login do usuario */

Drop Procedure If Exists loginUsuario$$

Create Procedure loginUsuario(vEmailUsuario varchar(200), vSenhaUsuario varchar(128))
begin

SELECT 
	nm_email_usuario, nm_usuario 
FROM 
	usuario 
where 
	nm_email_usuario = vEmailUsuario
and 
	nm_senha_usuario = md5(vSenhaUsuario); 

end$$

/* Procedure para login do paciente */

Drop Procedure if Exists loginPaciente$$

Create Procedure loginPaciente(vEmailPaciente varchar(200), vSenhaPaciente varchar(128))
begin

select 
	nm_login_paciente, nm_paciente
from
	paciente
where
	nm_login_paciente = vEmailPaciente
and
	nm_senha_paciente = md5(vSenhaPaciente);

end$$

/* Procedure para inserir um novo usuario (cadastro) */

Drop Procedure if exists inserirUsuario$$

Create Procedure inserirUsuario(vEmailUsuario varchar(200), vSenhaUsuario varchar(128), 
vTelefoneUsuario varchar(15), vNomeUsuario varchar(200))
begin

insert into 
	usuario
values
	(vEmailUsuario, vTelefoneUsuario, md5(vSenhaUsuario), vNomeUsuario, 1);
end$$


/* Procedure para inserir um novo paciente (cadastro) */

Drop Procedure if exists inserirPaciente$$

Create Procedure inserirPaciente(vLoginPaciente varchar(200), vSenhaPaciente varchar(128), 
vNomePaciente varchar(200), vEmailUsuario varchar(200))
begin

insert into 
	paciente
values
	(vLoginPaciente, md5(vSenhaPaciente), vEmailUsuario, vNomePaciente);
end$$

/* Procedure que altera a senha do usuario*/

Drop procedure if exists alterarSenhaUsuario$$

Create procedure alterarSenhaUsuario(vEmailUsuario varchar(200), vNovaSenha varchar(128))
begin

	update usuario set nm_senha_usuario = md5(vNovaSenha) where nm_email_usuario = vEmailUsuario;

end$$

/* Procedure que altera o telefone do usuario*/

Drop procedure if exists alterarTelefoneUsuario$$

Create procedure alterarTelefoneUsuario(vEmailUsuario varchar(200), vNovoTelefone varchar(15))
begin

	update usuario set cd_telefone_usuario = vNovoTelefone where nm_email_usuario = vEmailUsuario;

end$$

/* Procedure que altera o nome do usuario*/

Drop procedure if exists alterarNomeUsuario$$

Create procedure alterarNomeUsuario(vEmailUsuario varchar(200), vNovoNome varchar(200))
begin

	update usuario set nm_usuario = vNovoNome where nm_email_usuario = vEmailUsuario;

end$$

/* Procedure para consultar todos os temas */

Drop Procedure if exists dadosTema$$

Create Procedure dadosTema()
begin

	select * from tema;

end$$

/* Procedure para consultar todas as atividades perante um especifico tema */

Drop Procedure if exists dadosAtividade$$

Create Procedure dadosAtividade(vCdTema int(11))
begin

select 
	cd_atividade, nm_atividade 
from 
	atividade 
where 
	cd_tema = vCdTema;
end$$

/* Procedure para consultar todas as info de uma atividade */

Drop Procedure if exists dadosAtividadeEscolhida$$

Create Procedure dadosAtividadeEscolhida(vCdAtividade int(11))
begin

select 
	nm_atividade, ds_atividade 
from 
	atividade 
where 
	cd_atividade = vCdAtividade;

end$$

/* Procedure para inserir a atividade realizada pelo paciente */

Drop Procedure if exists atividadeRealizada$$

Create Procedure atividadeRealizada(vEmailPaciente varchar(200), vCdAtividade int, vCdAvaliacao int, vDtRealizacao date,  vHrRealizacao time, vTerminou tinyint(1))
begin

insert into 
	paciente_atividade 
values
	(vEmailPaciente, vCdAtividade, vCdAvaliacao, vDtRealizacao, vHrRealizacao, vTerminou);

end$$

/* procedure que retorna todos os dados da tabela video*/

Drop procedure if exists videosPaciente$$

Create procedure videosPaciente()
begin

	select * from video;

end$$

/* procedure que retorna o nome do paciente e email*/

Drop procedure if exists nomePaciente$$

Create Procedure nomePaciente(vEmailUsuario varchar(200))
begin

	select nm_paciente from paciente where nm_email_usuario = vEmailUsuario;

end$$

Drop procedure if exists dadosPaciente$$

Create procedure dadosPaciente()
begin 

	select * from paciente;

end$$

/* procedure que exclui um paciente*/

Drop procedure if exists excluirPaciente$$

Create Procedure excluirPaciente(vEmailPaciente varchar(200))
begin

	delete from video_paciente where nm_login_paciente = vEmailPaciente;
	delete from paciente where nm_login_paciente = vEmailPaciente;

end$$

/* procedure que altera dados de um paciente*/

Drop procedure if exists alterarDadosPaciente$$

Create Procedure alterarDadosPaciente(vEmailPaciente varchar(200), vNomePaciente varchar(200))
begin

	update paciente set nm_paciente = vNomePaciente;

end$$

/* Função que retorna a quantidade de atividades que um paciente realizou*/

Drop Function If exists qtdAtividadePaciente$$

Create Function qtdAtividadePaciente(vEmailPaciente varchar(200)) returns int
begin
	declare qtdAtividade int;

	select 
		count(vEmailPaciente) 
    into 
		qtdAtividade 
	from
		paciente_atividade 
	where 
		nm_login_paciente = vEmailPaciente;

	return qtdAtividade; 
end$$

/* Função que retorna o tema de menor dificultade de um paciente  */

Drop Function if exists menorDificultade$$

Create Function menorDificultade(vEmailPaciente varchar(200)) returns varchar(200)
begin

	declare menorDif varchar(200);

	select 
		t.nm_tema 
	into
		menorDif
	from 
		paciente_atividade pa join atividade a 
	on 
		(a.cd_atividade = pa.cd_atividade)
	join 
		tema t 
    on
		(a.cd_tema = t.cd_tema)
	where
		pa.cd_avaliacao = 1 and pa.nm_login_paciente = vEmailPaciente
	group by
		t.nm_tema;

	return menorDif;

end$$

/* Função que retorna o tema de menor dificultade de um paciente */

Drop function if exists maiorDificultade$$

Create Function maiorDificultade(vEmailPaciente varchar(200)) returns varchar(200)
begin

	declare maiorDif varchar(200);

	select 
		t.nm_tema 
	into
		maiorDif
	from 
		paciente_atividade pa join atividade a 
	on 
		(a.cd_atividade = pa.cd_atividade)
	join 
		tema t 
    on
		(a.cd_tema = t.cd_tema)
	where
		pa.cd_avaliacao = 3 and pa.nm_login_paciente = vEmailPaciente
	group by
		t.nm_tema;

	return maiorDif;

end$$

/* Procedure que retorna todos os dados de um paciente perante as suas atividades (relatorio geral)*/

Drop procedure if exists relatorioPaciente$$

Create procedure relatorioPaciente(vEmailPaciente varchar(200))
begin

	select 
		nm_paciente, qtdAtividadePaciente(vEmailPaciente) as qtdAtividade, menorDificultade(vEmailPaciente) as menorDif,
        maiorDificultade(vEmailPaciente) as maiorDif
	from 
		paciente 
	where 
		nm_login_paciente = vEmailPaciente
	group by
		vEmailPaciente;

end$$ 

Drop procedure if exists atividadeRealizada$$

Create procedure atividadeRealizada(vEmailPaciente varchar(200))
begin
 
	select 
		a.cd_atividade, date_format(pa.dt_realizacao, '%d/%m/%Y'), a.nm_atividade
	from 
		atividade a 
	join
		paciente_atividade pa 
	on 
		(pa.cd_atividade = a.cd_atividade)
	where
		nm_login_paciente = vEmailPaciente;
end$$

/* Procedure que retorna os detalhes atv */

Drop procedure if exists detalhesAtividade$$

Create procedure detalhesAtividade(vCdAtividade int, vEmailPaciente varchar(200))
begin
 
	select 
		a.cd_atividade, date_format(pa.dt_realizacao, '%d/%m/%Y'), a.nm_atividade, 
        pa.ic_terminou, t.nm_tema, ta.nm_avaliacao, tatv.ic_tem_nota
	from 
		atividade a 
	join
		paciente_atividade pa 
	on 
		(pa.cd_atividade = a.cd_atividade)
	join
		tema t 
	on
		(a.cd_tema = t.cd_tema)
	join
		avaliacao_dificuldade ta 
	on
		(pa.cd_avaliacao = ta.cd_avaliacao)
	join 
		tipo_atividade tatv
	on
		(tatv.cd_tipo_atividade = a.cd_tipo_atividade)
	where
		pa.cd_atividade = vCdAtividade and nm_login_paciente = vEmailPaciente;
end$$

Delimiter ;
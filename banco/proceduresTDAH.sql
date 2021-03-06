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
	a.cd_atividade, a.nm_atividade, t.nm_tema
from 
	atividade a
JOIN tema t 
ON (a.cd_tema = t.cd_tema)
where 
	a.cd_tema = vCdTema;
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

Drop procedure if exists videoPacienteTema$$

Create procedure videoPacienteTema(vCdTema int)
begin
	select v.cd_video, v.nm_video, t.nm_tema
	from video v join tema t
    on(v.cd_tema = t.cd_tema)
    where v.cd_tema = vCdTema;
end$$

Drop procedure if exists videoSelecionado$$

Create procedure videoSelecionado(vCdVideo int)
begin

	select nm_video, ds_conteudo_video, nm_link_video from video where cd_video = vCdVideo;
 
end$$



/* procedure que retorna o nome do paciente e email*/

Drop procedure if exists nomePaciente$$

Create Procedure nomePaciente(vEmailUsuario varchar(200))
begin

	select nm_login_paciente, nm_paciente from paciente where nm_email_usuario = vEmailUsuario;

end$$

Drop procedure if exists getNomePaciente$$

Create Procedure getNomePaciente(vLoginPaciente varchar(200))
begin

	select nm_paciente from paciente where nm_login_paciente = vLoginPaciente;

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
/*altera tudo de um paciente*/
Drop procedure if exists alterarDadosPaciente$$
Create Procedure alterarDadosPaciente(vLoginPaciente varchar(200), vSenhaPaciente varchar(128), vNomePaciente varchar(128))
begin
	update paciente set 
    nm_senha_paciente = md5(vSenhaPaciente),
    nm_paciente = vNomePaciente
    where nm_login_paciente = vLoginPaciente;
end$$

/* procedure que altera nome de um paciente*/

Drop procedure if exists alterarNomePaciente$$

Create Procedure alterarNomePaciente(vEmailPaciente varchar(200), vNomePaciente varchar(200))
begin

	update paciente set nm_paciente = vNomePaciente where nm_login_paciente = vEmailPaciente;

end$$

Drop procedure if exists alterarSenhaPaciente$$

Create Procedure alterarSenhaPaciente(vEmailPaciente varchar(200), vSenhaPaciente varchar(128))
begin

	update paciente set nm_senha_paciente = md5(vSenhaPaciente) where nm_login_paciente = vEmailPaciente;

end$$


/* Fun????o que retorna a quantidade de atividades que um paciente realizou*/

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

/* Fun????o que retorna o tema de menor dificultade de um paciente  */

Drop Function if exists menorDificuldade$$

Create Function menorDificuldade(vEmailPaciente varchar(200)) returns varchar(200)
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
		t.nm_tema
	order by
		pa.dt_fim desc
	limit 1;
	return menorDif;

end$$

/* Fun????o que retorna o tema de menor dificultade de um paciente */

Drop function if exists maiorDificuldade$$

Create Function maiorDificuldade(vEmailPaciente varchar(200)) returns varchar(200)
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

Drop function if exists qtdAtividadeQuiz$$

CREATE FUNCTION qtdAtividadeQuiz(vEmailPaciente varchar(200))
returns int
begin
	
    declare qtdAtividadeQuiz int;

	select 

		count(a.cd_tipo_atividade)
        
	into qtdAtividadeQuiz

	from
			paciente p join paciente_atividade pa
			on p.nm_login_paciente = pa.nm_login_paciente
			
			join atividade a
			on pa.cd_atividade = a.cd_atividade
			
		   join tipo_atividade ta
		   on a.cd_tipo_atividade = ta.cd_tipo_atividade
		
	where 
			p.nm_login_paciente = vEmailPaciente
			and ta.cd_tipo_atividade = 1;
            
	return qtdAtividadeQuiz;
    
end$$

Drop function if exists notaQuiz$$

CREATE FUNCTION notaQuiz(vEmailPaciente varchar(200))
returns float
begin
	
    declare notaQuiz float;

	select 

		 sum(pa.qtd_nota_atividade) / count(a.cd_tipo_atividade) as notaQuiz
        
	into notaQuiz

	from
			paciente p join paciente_atividade pa
			on p.nm_login_paciente = pa.nm_login_paciente
			
			join atividade a
			on pa.cd_atividade = a.cd_atividade
			
		   join tipo_atividade ta
		   on a.cd_tipo_atividade = ta.cd_tipo_atividade
		
	where 
			p.nm_login_paciente = vEmailPaciente
			and ta.cd_tipo_atividade = 1;
            
	return notaQuiz;
    
end$$


/* Procedure que retorna todos os dados de um paciente perante as suas atividades (relatorio geral)*/

Drop procedure if exists relatorioPaciente$$

Create procedure relatorioPaciente(vEmailPaciente varchar(200))
begin

	select 
			p.nm_paciente, qtdAtividadePaciente(vEmailPaciente) as qtdAtividade, menorDificuldade(vEmailPaciente) as menorDif,

			maiorDificuldade(vEmailPaciente) as maiorDif, 
            
            time_format( SEC_TO_TIME( SUM( TIME_TO_SEC( timediff(cast(concat(pa.dt_fim, ' ', pa.hr_fim) as datetime), 
			cast(concat(pa.dt_inicio, ' ', pa.hr_inicio) as datetime))  ) ) ),'%H:%i:%s') as tempoDiff,
            
          
            cast(SEC_TO_TIME(AVG(TIME_TO_SEC(timediff(cast(concat(pa.dt_fim, ' ', pa.hr_fim) as datetime), 
			cast(concat(pa.dt_inicio, ' ', pa.hr_inicio) as datetime))))) as time) as tempoMedio,

            
            qtdAtividadeQuiz(vEmailPaciente) as qtdAtividadeQuiz, 
            ta.nm_tipo_atividade as nomeQuiz, notaQuiz(vEmailPaciente) as notaQuiz,
            p.nm_login_paciente
	from
			paciente p join paciente_atividade pa
			on p.nm_login_paciente = pa.nm_login_paciente
              
            join atividade a
            on pa.cd_atividade = a.cd_atividade
            
           join tipo_atividade ta
           on a.cd_tipo_atividade = ta.cd_tipo_atividade
	where 
			p.nm_login_paciente = vEmailPaciente
	group by
		vEmailPaciente;

end$$ 

Drop procedure if exists atividadeRealizada$$

Create procedure atividadeRealizada(vEmailPaciente varchar(200))
begin
 
	select 
		a.cd_atividade, date_format(pa.dt_inicio, '%d/%m/%Y'), a.nm_atividade
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

Create procedure detalhesAtividade(vEmailPaciente varchar(200))
begin
 
	select distinct
		a.cd_atividade, date_format(pa.dt_inicio, '%d/%m/%Y') as dataInicio, 
        date_format(pa.dt_fim, '%d/%m/%Y') as dataFim, timediff(cast(concat(pa.dt_fim, ' ', pa.hr_fim) as datetime), 
		cast(concat(pa.dt_inicio, ' ', pa.hr_inicio) as datetime)) as tempoDiff,
        a.nm_atividade, t.nm_tema, ta.nm_avaliacao, tatv.ic_tem_nota,
		notaQuiz(vEmailPaciente) as notaQuiz
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
	where nm_login_paciente = vEmailPaciente
    
    order by dt_inicio desc;
end$$

/* procedure pra inserir o jogo ta */
Drop Procedure if exists inserirResultadoJogo$$
Create Procedure inserirResultadoJogo(vLoginPaciente varchar(200), vCdAtividade int(128), 
vCdAvaliacao int(2), vDtInicio DATE,vDtFim Date, vHoraInicio TIME ,vHoraFim TIME, vQtdNota varchar(2))
begin
insert into 
    paciente_atividade
values
    (vLoginPaciente , vCdAtividade, vCdAvaliacao, vDtInicio, vHoraInicio, vDtFim, vHoraFim,vQtdNota);
end$$
Delimiter ;

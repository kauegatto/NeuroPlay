DROP SCHEMA IF EXISTS prjTDAH;
CREATE SCHEMA prjTDAH;
USE prjTDAH;

Create Table avaliacao_dificuldade
(
	cd_avaliacao int(11),
	nm_avaliacao varchar(200),
	constraint primary key pk_avaliacao_dificuldade (cd_avaliacao)
);

Create Table tema 
(
	cd_tema int(11),
	nm_tema varchar(200),
	constraint primary key pk_tema (cd_tema)
);


Create Table video 
(
	cd_video int(11),
	nm_video varchar(200),
	ds_conteudo_video text,
	nm_link_video text,
	cd_tema int(11),
	constraint primary key pk_video (cd_video),
	constraint fk_tema_video foreign key (cd_tema)
	references tema (cd_tema)
);

Create Table tipo_atividade
(
	cd_tipo_atividade int(11),
	nm_tipo_atividade varchar(200),
	ic_tem_nota boolean,
	ds_tipo_atividade text,
	constraint primary key pk_tipo_atividade (cd_tipo_atividade)
);

Create Table tipo_usuario
(
	cd_tipo_usuario int(11),
	nm_tipo_usuario varchar(45),
	constraint primary key pk_tipo_usuario (cd_tipo_usuario)
);

Create Table usuario 
(
	nm_email_usuario varchar(200),
	cd_telefone_usuario varchar(15),
	nm_senha_usuario varchar(128),
	nm_usuario varchar(200),
	ds_usuario text,
	cd_tipo_usuario int(11),
	constraint primary key pk_email_usuario (nm_email_usuario),
	constraint fk_tipo_usuario foreign key (cd_tipo_usuario) references tipo_usuario (cd_tipo_usuario)
);

Create Table paciente
(
	nm_login_paciente varchar(200),
	nm_senha_paciente varchar(128),
	nm_email_usuario varchar(200),
	nm_paciente varchar(200),
	constraint primary key pk_login_paciente (nm_login_paciente),
	constraint fk_email_usuario foreign key (nm_email_usuario) references usuario (nm_email_usuario)
);

Create Table atividade 
(
	cd_atividade int(11),
	nm_atividade varchar(200),
	ds_atividade TEXT,
	cd_tipo_atividade int(11),
	cd_tema int(11),
	constraint primary key pk_atividade (cd_atividade),
	constraint fk_tema_atividade foreign key (cd_tema)
	references tema (cd_tema)
);

Create Table paciente_atividade 
(
	nm_login_paciente varchar(200),
	cd_atividade int(11),
	cd_avaliacao int(11),
	dt_inicio date,
	hr_inicio time,
	dt_fim date,
	hr_fim time,
	constraint primary key pk_login_paciente_atividade (nm_login_paciente, cd_atividade, dt_inicio, hr_inicio, dt_fim, hr_fim),
	constraint fk_login_paciente_atividade foreign key (nm_login_paciente) 
	references paciente (nm_login_paciente),
	constraint fk_atividade_paciente foreign key (cd_atividade)
	references atividade (cd_atividade),
	constraint fk_avaliacao_paciente foreign key (cd_avaliacao)
	references avaliacao_dificuldade (cd_avaliacao)
);

Create Table video_paciente
(
	cd_video int(11),
	nm_login_paciente varchar(200),
	cd_avaliacao int(11),
	ic_jaViu boolean,
	constraint primary key pk_video_paciente (cd_video, nm_login_paciente),
	constraint fk_video_paciente foreign key (cd_video)
	references video (cd_video),
	constraint fk_login_video_paciente foreign key (nm_login_paciente) 
	references paciente (nm_login_paciente),
	constraint fk_avaliacao_video_paciente foreign key (cd_avaliacao)
	references avaliacao_dificuldade (cd_avaliacao)
);
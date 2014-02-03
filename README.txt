Projecto para a disciplina - Projecto WEB;
3º Ano - Engenharia da Computação Gŕagica e Multimédia
IPVC - ESTG

### Configurar phpMyAdmin ###
1º Criar base de dados
2º Executar o SQL para criação da tabela:

CREATE TABLE `file` (
    `id`        Int Unsigned Not Null Auto_Increment,
    `name`      VarChar(255) Not Null Default 'Untitled.txt',
    `mime`      VarChar(50) Not Null Default 'text/plain',
    `size`      BigInt Unsigned Not Null Default 0,
    `created`   DateTime Not Null,
    PRIMARY KEY (`id`)
)

### Configurar ficheiro add_file.php ###
Na linha 19:
$dbLink = new mysqli('localhost', 'root', 'root', 'mash');
Mudar conforme as settings que o phpMyAdmin tem.
localhost -> para serviidor local
1º root -> nome utilizador phpMyAdmin
2º root -> palavra pass utilizador phpMyAdmin
mash -> nome da base de dados

### Configuração para Linux ###

chmod -R 777 nomeDaDirectoria - > dar permissões á pasta de uploads para ser escrita.


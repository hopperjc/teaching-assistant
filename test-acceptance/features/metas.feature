Feature: As a Professor.
         I want fazer o cadastro e alteração de metas.
         So that eu possa avaliar cada meta com uma nota associada para cada aluno da turma e no fim da turma possa excluir as metas daquele período.

Scenario: Adicionar meta 
Given Estou na "página de metas"
When Escrevo a meta "Especificar Conceitos de Gerência de Configuração com Qualidade"
And Apertar o botão "Adicionar"
Then Poderei ver meta "Especificar Conceitos de Gerência de Configuração com Qualidade" na página de metas

Scenario: Adicionar meta já cadastrada
Given Consigo ver a meta "Especificar Conceitos de Gerência de Configuração com Qualidade" na página de metas
When Escrevo a meta "Especificar Conceitos de Gerência de Configuração com Qualidade"
Then Uma menssagem de erro é exibida

Scenario: Excluir meta
Given Estou na "página de metas"
When Clico no botão "Remover"
Then A meta ao lado do botão é removida

Scenario: Cadastro de metas 
Given O sistema não contém a meta "Entende Conceito de Gerência de Configuração"
When O usuário realizar o cadastro da meta "Entende Conceito de Gerência de Configuração"
Then O sistema deve armazenar a meta "Entende Conceito de Gerência de Configuração"

Scenario: Remoção de metas
Given O sistema contém a meta "Especificar Testes com Qualidade"
When O usuário realizar a remoção da meta "Especificar Testes com Qualidade"
Then O sistema não possui mais a meta "Especificar Testes com Qualidade"

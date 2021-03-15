# avaliacao-app

-.<br>
-As inserções dos dados da tabela Categoria foram realizados atráves do ícone "Add new row" do DBeaver.<br>
-Foram criadas as estruturas das camadas conforme o documento da avaliação.<br>
-Foram criadas as models Curso e Categoria e depois mapeadas com o javax.persistence.<br>
-Foi utilizado o lombok para produtividade e redução de código.<br>
-Foram criadas as classes controllers CursoController e CategoriaController para expor os endpoints REST para consumo do frontend e depois foram mapeadas com o org.springframework. Foi utilizado CORS para o navegador obter os dados da API.<br>
-Foram criadas as classes services CursoService e CategoriaService para validar as regras de negócio e depois foram mapeadas com o org.springframework.<br>
-Foram criadas as classes repositories CursoRepository e CategoriaRepository para comunicação com o banco dados. Foi utilizado o @Query para verificar cursos dentro do mesmo periodo.<br>
-Foram criadas as DTOs(Data Transfer Object) para tranferência de dados entre as camadas.<br>
-Foi utilizado o Modelmapper para copiar os dados das models para as DTOs diminuindo a quantidade de código.<br>
-Foi utilizado o conceito de Internacionalização para padronizar as mensagens de validações.

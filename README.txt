Revisão do fluxo Flex (PT) — pacote para compartilhar
=====================================================

Esta pasta é autocontida. Não precisa instalar nem usar servidor.

COMO ABRIR O PROTÓTIPO
  1. Descompacte se recebeu um arquivo .zip.
  2. Mantenha esta estrutura de pastas:
       share-for-pm/
         README.txt          (este arquivo)
         PM-EXPORT.md        (handoff de produto — comece aqui)
         flex-discounts-review-pt/
           index.html        ← abra no Chrome ou Edge
         _shared/            (assets — não mova)
  3. Abra flex-discounts-review-pt/index.html no Chrome ou Edge.
  4. Use o alternador Perfil de demonstração (canto inferior direito): Representante de vendas vs Varejista.

HANDOFF PARA PM
  Leia PM-EXPORT.md nesta pasta para hipótese, roteiros, regras flex e perguntas de revisão.

FLUXO PRINCIPAL (representante)
  Upload OC → Caminhão → Salvar como rascunho → Forma de pagamento → Editar flex nos produtos
  → Resumo automático → Enviar para aprovação → Fazer pedido

NOTAS
  - Todos os dados são simulados (sem CNPJs, preços ou clientes reais).
  - Eventos ficam apenas no navegador (localStorage); nada é enviado a servidor.
  - Protótipo em português (pt-BR): flex-discounts-review-pt

Preparado por Beatriz Garcia · Link Ops (Midna)

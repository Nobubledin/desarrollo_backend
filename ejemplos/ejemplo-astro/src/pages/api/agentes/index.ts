export const GET: APIRoute = ({ params, request }) => {
  return new Response(JSON.stringify({
      result: [
        { name: 'Smith'},
        { name: 'Brown'},
      ]
    })
  )
}
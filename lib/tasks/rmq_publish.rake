require 'bunny'

namespace :rmq do
  task :publish do
    conn = Bunny.new(:host => "localhost")
    conn.start
    ch = conn.create_channel

    q  = ch.queue("rpc_queue",{:auto_delete => false, durable: true, exclusive: false})
    (1..10).each do |i|
      #write to postgres submissions db
      q.publish(JSON.generate({jobId: i}), :routing_key => q.name)
    end
    # close the connection
    conn.stop
  end
end
